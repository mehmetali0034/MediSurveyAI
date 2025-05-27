from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # <-- Burayı ekledim
import numpy as np
from PIL import Image, ImageDraw
import io
import tensorflow as tf
from utils import resize_3d, normalize, UNet
import json
import os
import cv2

app = FastAPI(title="MediSurvey AI Segmentation Service")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 'output' klasörünü public erişime aç
app.mount("/output", StaticFiles(directory="output"), name="output")

# Model dosya yolları
MODEL_PATHS = {
    "merged": os.path.join(os.path.dirname(__file__), 'weights', 'seg_merged.h5'),
    "femur": os.path.join(os.path.dirname(__file__), 'weights', 'seg_femur.h5'),
    "tibia": os.path.join(os.path.dirname(__file__), 'weights', 'seg_tibia.h5'),
    "fibula": os.path.join(os.path.dirname(__file__), 'weights', 'seg_fibula.h5'),
}


# Model cache
MODEL_CACHE = {}

def get_model(segment_type):
    if segment_type not in MODEL_PATHS:
        raise HTTPException(status_code=400, detail=f"Geçersiz segment_type: {segment_type}")
    if segment_type in MODEL_CACHE:
        return MODEL_CACHE[segment_type]
    # Modeli oluştur ve ağırlıkları yükle
    model = UNet((224, 224, 1), 1, 32, 4, 1, 'elu', upconv=False)
    model.load_weights(MODEL_PATHS[segment_type])
    MODEL_CACHE[segment_type] = model
    return model

# Create input and output directories if they don't exist
os.makedirs('input', exist_ok=True)
os.makedirs('output', exist_ok=True)

def draw_bounding_boxes(image, mask, segment_names=None, threshold=0.5):
    if mask.dtype != np.uint8:
        mask = (mask > threshold).astype(np.uint8) * 255
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    img_with_boxes = image.copy()
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.6
    thickness = 2
    # Renkler: femur (mavi), tibia (yeşil), fibula (kırmızı)
    color_map = {
        "femur": (255, 0, 0),    # Mavi (BGR)
        "tibia": (0, 255, 0),    # Yeşil
        "fibula": (0, 0, 255),   # Kırmızı
    }
    if segment_names is None:
        segment_names = ["segment"]
    for i, contour in enumerate(contours):
        x, y, w, h = cv2.boundingRect(contour)
        seg_name = segment_names[i % len(segment_names)]
        color = color_map.get(seg_name, (0, 255, 0))
        cv2.rectangle(img_with_boxes, (x, y), (x + w, y + h), color, 2)
        label = f"{seg_name}"
        (text_width, text_height), _ = cv2.getTextSize(label, font, font_scale, thickness)
        # Yazı kutusu görselin dışına taşmasın diye ayarla
        label_y = y - 8 if y - text_height - 8 > 0 else y + text_height + 8
        cv2.rectangle(img_with_boxes, (x, label_y - text_height - 4), (x + text_width, label_y), color, -1)
        cv2.putText(img_with_boxes, label, (x, label_y - 4), font, font_scale, (0, 0, 0), thickness, cv2.LINE_AA)
    return img_with_boxes

def get_numbered_filename(filename):
    base, ext = os.path.splitext(filename)
    counter = 1
    while os.path.exists(os.path.join('output', f"{base}_{counter}{ext}")):
        counter += 1
    return f"{base}_{counter}{ext}"

@app.post("/segment")
async def segment_image(
    file: UploadFile = File(...),
    segment_type: str = Query("merged", enum=list(MODEL_PATHS.keys()))
):
    try:
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise HTTPException(status_code=400, detail="Sadece PNG, JPG veya JPEG dosyaları kabul edilir")
        contents = await file.read()
        try:
            image = Image.open(io.BytesIO(contents))
        except Exception as e:
            raise HTTPException(status_code=400, detail="Geçersiz görüntü dosyası")
        input_path = os.path.join('input', file.filename)
        image.save(input_path)
        img_array = np.array(image)
        if len(img_array.shape) == 2:
            img_array = np.expand_dims(img_array, axis=-1)
        elif len(img_array.shape) == 3 and img_array.shape[2] > 1:
            img_array = np.mean(img_array, axis=2, keepdims=True)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = resize_3d(img_array, (224, 224))
        img_array = normalize(img_array, 0, 255)
        img_array_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        if segment_type == "merged":
            # Her kemik için ayrı model ile segmentasyon yap
            boxes = []
            for bone in ["femur", "tibia", "fibula"]:
                model = get_model(bone)
                prediction = model.predict(img_array)
                prediction = np.squeeze(prediction)
                prediction = (prediction > 0.5).astype(np.uint8) * 255
                # Kutuları çiz
                img_array_cv = draw_bounding_boxes(img_array_cv, prediction, segment_names=[bone])
                # Kutu koordinatlarını da JSON'a ekle
                contours, _ = cv2.findContours(prediction, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                for contour in contours:
                    x, y, w, h = cv2.boundingRect(contour)
                    boxes.append({"bone": bone, "box": [int(x), int(y), int(w), int(h)]})
            output_image = cv2.cvtColor(img_array_cv, cv2.COLOR_BGR2RGB)
            output_image = Image.fromarray(output_image)
            output_filename = get_numbered_filename(file.filename)
            output_path = os.path.join('output', output_filename)
            output_image.save(output_path)
            result = {
                "status": "success",
                "segments": ["femur", "tibia", "fibula"],
                "boxes": boxes,
                "output_image": output_filename
            }
        else:
            model = get_model(segment_type)
            prediction = model.predict(img_array)
            prediction = np.squeeze(prediction)
            prediction = (prediction > 0.5).astype(np.uint8) * 255
            img_array_cv = draw_bounding_boxes(img_array_cv, prediction, segment_names=[segment_type])
            output_image = cv2.cvtColor(img_array_cv, cv2.COLOR_BGR2RGB)
            output_image = Image.fromarray(output_image)
            output_filename = get_numbered_filename(file.filename)
            output_path = os.path.join('output', output_filename)
            output_image.save(output_path)
            # Kutu koordinatlarını da JSON'a ekle
            boxes = []
            contours, _ = cv2.findContours(prediction, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            for contour in contours:
                x, y, w, h = cv2.boundingRect(contour)
                boxes.append({"bone": segment_type, "box": [int(x), int(y), int(w), int(h)]})
            result = {
                "status": "success",
                "segments": [segment_type],
                "boxes": boxes,
                "output_image": output_filename
            }
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Segmentasyon işlemi sırasında hata oluştu: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4000) 