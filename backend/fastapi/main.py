import io
import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File
import uvicorn

from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.optimizers import Adam


FEATURE_NAMES = [
    "ramp", "parking", "bathroom", "elevator", "tactical_floor",
    "signage", "braille", "audio", "guide", "sign_language", "veterans_discounts"
]

def create_accessibility_model(input_shape=(224, 224, 3), num_features=11):
    """
    Creates and compiles the accessibility model based on MobileNetV2.
    """
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=input_shape)
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    predictions = Dense(num_features, activation='sigmoid')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    
    for layer in base_model.layers:
        layer.trainable = False
    
    model.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])
    return model

app = FastAPI(
    docs_url="/docs",
)
model = create_accessibility_model()

@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):

    image_bytes = await image.read()
    
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    except Exception:
        return {"error": "Invalid image format. Please upload a valid image file."}
    
    img = img.resize((224, 224))
    img_array = np.array(img)
    
    img_batch = np.expand_dims(img_array, axis=0)
    img_batch = preprocess_input(img_batch)
    
    predictions = model.predict(img_batch)[0]
    
    prediction_results = {
        feature: bool(prediction >= 0.5)
        for feature, prediction in zip(FEATURE_NAMES, predictions)
    }
    
    return {"predictions": prediction_results, "raw": predictions.tolist()}

if __name__ == "__main__":
    # Run the FastAPI service on host 0.0.0.0 and port 8001
    uvicorn.run(app, host="0.0.0.0", port=8001)
