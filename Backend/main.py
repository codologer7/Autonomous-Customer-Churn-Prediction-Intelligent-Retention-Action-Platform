from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import numpy as np
import joblib

app = FastAPI(
    title="Customer Churn Prediction API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXPECTED_FEATURES = 30


class CustomerFeatures(BaseModel):
    features: List[float]


try:
    model = joblib.load("../Model/model.pkl")
    print("Model loaded successfully")
    print(f"Model expects {EXPECTED_FEATURES} features")
except Exception as e:
    raise RuntimeError(f"Model loading failed: {e}")


@app.get("/")
def home():
    return {"message": "Customer Churn Prediction API running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict/customer")
def predict_customer(customer: CustomerFeatures):

    data = customer.features

    if len(data) != EXPECTED_FEATURES:
        raise HTTPException(
            status_code=400,
            detail=f"Expected {EXPECTED_FEATURES} features"
        )

    input_data = np.array(data).reshape(1, -1)

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0][1]

    message = (
        "Customer likely to churn"
        if prediction == 1
        else "Customer not likely to churn"
    )

    return {
        "prediction": int(prediction),
        "probability": float(probability),
        "message": message
    }