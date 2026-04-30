from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# CORS (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("model.pkl")
features = joblib.load("features.pkl")


# Risk logic
def get_risk_action(prob):
    if prob > 0.75:
        return "High", "Call + Offer Discount"
    elif prob > 0.5:
        return "Medium", "Send Email Offer"
    else:
        return "Low", "Monitor Customer"


@app.get("/")
def home():
    return {"message": "API running"}


# 🔹 Single prediction
@app.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([data])

    df = pd.get_dummies(df)
    df = df.reindex(columns=features, fill_value=0)

    prob = model.predict_proba(df)[0][1]
    risk, action = get_risk_action(prob)

    return {
        "churn_probability": round(float(prob), 2),
        "risk_level": risk,
        "suggested_action": action,
    }


# 🔥 Bulk prediction with customer ID
@app.post("/predict-bulk")
async def predict_bulk(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    df_original = df.copy()

    # remove unwanted columns
    df = df.drop(columns=["customerID", "Churn"], errors="ignore")

    df = pd.get_dummies(df)
    df = df.reindex(columns=features, fill_value=0)

    probs = model.predict_proba(df)[:, 1]

    results = []

    for i, prob in enumerate(probs):
        risk, action = get_risk_action(prob)

        customer_id = (
            df_original.iloc[i]["customerID"]
            if "customerID" in df_original.columns
            else f"CUST_{i+1}"
        )

        results.append({
            "customer_id": str(customer_id),
            "churn_probability": round(float(prob), 2),
            "risk_level": risk,
            "suggested_action": action
        })

    return {
        "total_customers": len(results),
        "results": results
    }