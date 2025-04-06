import os
import numpy as np
import tensorflow as tf
from PIL import Image
import base64

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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
    return np.expand_dims(img_array, axis=0)

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
