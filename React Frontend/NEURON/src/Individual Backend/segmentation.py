from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tensorflow as tf
from werkzeug.utils import secure_filename
from utils import allowed_file, preprocess_image, post_process_segmentation, image_to_base64, UPLOAD_FOLDER
from PIL import Image

app = Flask(__name__)
CORS(app)

def dice_coefficient(y_true, y_pred, smooth=1e-6):
    y_true_f = tf.keras.backend.flatten(y_true)
    y_pred_f = tf.keras.backend.flatten(y_pred)
    intersection = tf.reduce_sum(y_true_f * y_pred_f)
    return (2.0 * intersection + smooth) / (tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f) + smooth)

model = tf.keras.models.load_model("models/U-Net_2.keras", custom_objects={"dice_coefficient": dice_coefficient}, compile=False)

@app.route("/segment", methods=["POST"])
def segment_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    img = preprocess_image(path, (256, 256), force_rgb=True)
    mask = model.predict(img)
    mask = post_process_segmentation(mask)

    mask_path = os.path.join(UPLOAD_FOLDER, f"seg_{filename}")
    Image.fromarray(mask).save(mask_path)

    return jsonify({"segmented_image": image_to_base64(mask_path)})

if __name__ == "__main__":
    app.run(port=5002, debug=True)
