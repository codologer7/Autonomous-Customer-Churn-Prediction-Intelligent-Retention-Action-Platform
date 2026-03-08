# Autonomous Customer Churn Prediction Platform

## Overview
This project predicts customer churn using Machine Learning.
It combines:
- A **Machine Learning model**
- A **FastAPI backend API**
- A **React frontend dashboard**

The system helps businesses **identify high-risk customers and take retention actions**.

---
## Tech Stack

### Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- React
- Axios
- HTML / CSS / JavaScript

---

## Models Used
- Logistic Regression (Balanced)
- Random Forest (Balanced)

## Techniques
- Class imbalance handling
- Feature importance analysis
- SHAP Explainability
- Model comparison (Accuracy, Precision, Recall, F1)

## Dataset
Telco Customer Churn Dataset [Source - Kaggle]

## Results
- Logistic Regression Accuracy: ~74%
- Random Forest Accuracy: ~76%
- Improved Recall for churn class using class_weight='balanced'

---

## Contributors

- **Abhay Singh** — Machine Learning Model
- **Manish Agrawal** — Backend (FastAPI API)
- **Gaurav Kumar Bansal** — Frontend (React Dashboard)

---

## Future Improvements

- Add customer database
- Deploy system on cloud
- Build advanced analytics dashboard
- Add retention recommendation system

---
