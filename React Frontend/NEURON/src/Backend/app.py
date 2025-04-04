from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import tensorflow as tf
from werkzeug.utils import secure_filename
from PIL import Image
import base64
import traceback
import keras
import cv2
import matplotlib.pyplot as plt
from tf_explain.core.grad_cam import GradCAM
from lime import lime_image
from skimage.segmentation import mark_boundaries
import shap

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@keras.saving.register_keras_serializable()
def dice_coefficient(y_true, y_pred, smooth=1e-6):
    y_true_f = tf.keras.backend.flatten(y_true)
    y_pred_f = tf.keras.backend.flatten(y_pred)
    intersection = tf.reduce_sum(y_true_f * y_pred_f)
    return (2.0 * intersection + smooth) / (tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f) + smooth)

# Load models
model_path1 = "models/Brain_Tumour_Classification_hybrid_model_Last.keras"
model_path2 = "models/U-Net_2.keras"

classification_model = tf.keras.models.load_model(model_path1)
segmentation_model = tf.keras.models.load_model(model_path2, custom_objects={"dice_coefficient": dice_coefficient}, compile=False)

print(f"Loaded classification model from: {model_path1}")
print(f"Loaded segmentation model from: {model_path2}")

conv_layers = [layer.name for layer in classification_model.layers if isinstance(layer, tf.keras.layers.Conv2D)]
last_conv_layer = conv_layers[-1] if conv_layers else None

if last_conv_layer is None:
    raise ValueError("No Conv2D layers found in the model. Grad-CAM requires a CNN component.")

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path, target_size, force_rgb=False):
    img = Image.open(image_path)
    img = img.resize(target_size)
    
    if force_rgb:
        img = img.convert("RGB")

    img_array = np.array(img) / 255.0  

    if len(img_array.shape) == 2:  
        img_array = np.stack([img_array] * 3, axis=-1)  
    
    img_array = np.expand_dims(img_array, axis=0)  
    return img_array

def post_process_segmentation(mask):
    if mask.shape[-1] > 1:
        mask = np.argmax(mask, axis=-1)
    else:  
        mask = (mask > 0.5).astype(np.uint8)  

    mask = np.squeeze(mask)
    mask = (mask * 255).astype(np.uint8)  
    return mask

def image_to_base64(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def generate_gradcam(image_array, original_image, model, layer_name):
    explainer = GradCAM()
    predicted_class = np.argmax(model.predict(image_array))
    
    heatmap = explainer.explain(validation_data=(image_array, None),
                                model=model,
                                layer_name=layer_name,
                                class_index=predicted_class)
    
    heatmap = cv2.resize(heatmap, (original_image.shape[1], original_image.shape[0]))
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    alpha = 0.4
    superimposed_img = cv2.addWeighted(original_image, alpha, heatmap, 1 - alpha, 0)

    gradcam_path = os.path.join(app.config["UPLOAD_FOLDER"], "gradcam_result.png")
    Image.fromarray(superimposed_img).save(gradcam_path)

    return gradcam_path

def generate_lime_explanation(image_path, model):
    image = Image.open(image_path).convert("RGB")
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0

    explainer = lime_image.LimeImageExplainer()

    def predict_fn(images):
        images = np.array(images)
        return model.predict(images)

    explanation = explainer.explain_instance(
        image_array, predict_fn, top_labels=1, hide_color=0, num_samples=1000
    )

    label = explanation.top_labels[0]
    temp, mask = explanation.get_image_and_mask(label, positive_only=True, num_features=10, hide_rest=True)

    plt.figure(figsize=(5, 5))
    plt.imshow(mark_boundaries(temp / 3 + 0.5, mask))
    plt.title("LIME Explanation")
    plt.axis("off")

    lime_path = os.path.join(app.config["UPLOAD_FOLDER"], "lime_result.png")
    plt.savefig(lime_path, bbox_inches="tight")
    plt.close()

    return lime_path

def generate_shap_explanation(image_array, model):
    masker_blur = shap.maskers.Image("blur(224,224)", image_array.shape[1:])
    explainer = shap.Explainer(model, masker_blur, output_names=list(range(16)))

    shap_values = explainer(image_array, max_evals=5000, batch_size=50)
    predicted_class = np.argmax(model.predict(image_array), axis=1)[0]

    shap_values_predicted_class = shap_values.values[..., predicted_class]
    
    shap_path = os.path.join(app.config["UPLOAD_FOLDER"], "shap_result.png")
    shap.image_plot([shap_values_predicted_class], image_array, show=False)
    plt.savefig(shap_path, bbox_inches="tight")
    
    return shap_path

@app.route("/", methods=["GET"])
def home():
    return "Flask server is running!"

@app.route("/inputPage", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    try:
        image_data_classification = preprocess_image(file_path, target_size=(224, 224), force_rgb=True)
        image_data_segmentation = preprocess_image(file_path, target_size=(256, 256), force_rgb=True)

        classification_prediction = classification_model.predict(image_data_classification)
        predicted_class = np.argmax(classification_prediction, axis=1)[0]
        class_labels = {
            0: "Astrocitoma", 1: "Carcinoma", 2: "Ependimoma", 3: "Ganglioglioma",
            4: "Germinoma", 5: "Glioblastoma", 6: "Granuloma", 7: "Meduloblastoma",
            8: "Neurocitoma", 9: "Oligodendroglioma", 10: "Papiloma", 11: "Schwannoma",
            12: "Tuberculoma", 13: "Meningioma", 14: "No Tumour", 15: "Pituitary"
        }
        classification_result = class_labels.get(predicted_class, "Unknown")

        segmentation_mask = segmentation_model.predict(image_data_segmentation)
        segmentation_mask = post_process_segmentation(segmentation_mask)

        mask_filename = f"segmentation_{filename.split('.')[0]}.png"
        mask_path = os.path.join(app.config["UPLOAD_FOLDER"], mask_filename)
        Image.fromarray(segmentation_mask).save(mask_path)

        original_image = np.array(Image.open(file_path).convert("RGB"))
        gradcam_path = generate_gradcam(image_data_classification, original_image, classification_model, last_conv_layer)
        lime_path = generate_lime_explanation(file_path, classification_model)
        shap_path = generate_shap_explanation(image_data_classification, classification_model)

        response = {
            "segmented_image": image_to_base64(mask_path),
            "classification": classification_result,
            "xai_results": {
                "gradcam": image_to_base64(gradcam_path),
                "lime": image_to_base64(lime_path),
                "shap": image_to_base64(shap_path)
            }
        }
        return jsonify(response)

    except Exception as e:
        print("Error:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
