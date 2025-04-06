from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tensorflow as tf
from werkzeug.utils import secure_filename
from utils import allowed_file, preprocess_image, UPLOAD_FOLDER

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("models/Brain_Tumour_Classification_hybrid_model_Last.keras")

class_labels = {
    0: "Astrocitoma", 1: "Carcinoma", 2: "Ependimoma", 3: "Ganglioglioma",
    4: "Germinoma", 5: "Glioblastoma", 6: "Granuloma", 7: "Meduloblastoma",
    8: "Neurocitoma", 9: "Oligodendroglioma", 10: "Papiloma", 11: "Schwannoma",
    12: "Tuberculoma", 13: "Meningioma", 14: "No Tumour", 15: "Pituitary"
}

@app.route("/classify", methods=["POST"])
def classify_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    img = preprocess_image(path, target_size=(224, 224), force_rgb=True)
    prediction = model.predict(img)
    predicted_class = int(tf.argmax(prediction, axis=1)[0])
    return jsonify({"classification": class_labels.get(predicted_class, "Unknown")})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
