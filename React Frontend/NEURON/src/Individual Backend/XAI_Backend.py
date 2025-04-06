from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import tensorflow as tf
import cv2
import shap
from werkzeug.utils import secure_filename
from lime import lime_image
from skimage.segmentation import mark_boundaries
import matplotlib.pyplot as plt
from PIL import Image
from tf_explain.core.grad_cam import GradCAM
from utils import allowed_file, preprocess_image, image_to_base64, UPLOAD_FOLDER

app = Flask(__name__)
CORS(app)

# Load model
model = tf.keras.models.load_model("models/Brain_Tumour_Classification_hybrid_model_Last.keras")
last_conv_layer = [layer.name for layer in model.layers if isinstance(layer, tf.keras.layers.Conv2D)][-1]

# LIME Explanation
@app.route("/lime", methods=["POST"])
def lime_explain():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    image = Image.open(path).convert("RGB").resize((224, 224))
    image_np = np.array(image) / 255.0
    explainer = lime_image.LimeImageExplainer()

    explanation = explainer.explain_instance(
        image_np, lambda imgs: model.predict(np.array(imgs)),
        top_labels=1, hide_color=0, num_samples=1000
    )

    label = explanation.top_labels[0]
    temp, mask = explanation.get_image_and_mask(label, positive_only=True, num_features=15, hide_rest=True)

    plt.imshow(mark_boundaries(temp / 3 + 0.5, mask))
    plt.axis("off")
    lime_path = os.path.join(UPLOAD_FOLDER, f"lime_{filename}.png")
    plt.savefig(lime_path, bbox_inches="tight")
    plt.close()

    return jsonify({"lime": image_to_base64(lime_path)})

# SHAP Explanation
@app.route("/shap", methods=["POST"])
def shap_explain():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    image_array = preprocess_image(path, (224, 224), force_rgb=True)
    masker_blur = shap.maskers.Image("blur(224,224)", image_array.shape[1:])
    explainer = shap.Explainer(model, masker_blur, output_names=list(range(16)))

    shap_values = explainer(image_array, max_evals=5000, batch_size=50)
    pred_class = np.argmax(model.predict(image_array), axis=1)[0]
    shap_values_image = shap_values.values[..., pred_class]

    shap_path = os.path.join(UPLOAD_FOLDER, f"shap_{filename}.png")
    shap.image_plot([shap_values_image], image_array, show=False)
    plt.savefig(shap_path, bbox_inches="tight")
    plt.close()

    return jsonify({"shap": image_to_base64(shap_path)})

# Grad-CAM Explanation
@app.route("/gradcam", methods=["POST"])
def gradcam():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    img = preprocess_image(path, (224, 224), True)
    pred_class = np.argmax(model.predict(img))

    explainer = GradCAM()
    heatmap = explainer.explain((img, None), model, layer_name=last_conv_layer, class_index=pred_class)

    original = np.array(Image.open(path).convert("RGB"))
    heatmap = cv2.resize(heatmap, (original.shape[1], original.shape[0]))
    heatmap = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
    superimposed = cv2.addWeighted(original, 0.4, heatmap, 0.6, 0)

    gradcam_path = os.path.join(UPLOAD_FOLDER, f"gradcam_{filename}")
    Image.fromarray(superimposed).save(gradcam_path)

    return jsonify({"gradcam": image_to_base64(gradcam_path)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
