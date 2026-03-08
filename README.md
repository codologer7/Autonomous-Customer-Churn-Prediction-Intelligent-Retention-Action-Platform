# Autonomous Customer Churn Prediction Platform

## Overview
This project predicts customer churn using Machine Learning.
It combines:
- A **Machine Learning model**
- A **FastAPI backend API**
- A **React frontend dashboard**

The system helps businesses **identify high-risk customers and take retention actions**.

---
## Project Structure
```

Autonomous-Customer-Churn-Prediction
│
├── Backend
│ └── main.py
│
├── frontend
│ ├── src
│ ├── public
│ └── package.json
│
├── churn_model.pkl
├── Customer_Churn.ipynb
└── README.md
```
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

- ## Project Architecture

```
React Frontend
│
▼
FastAPI Backend
│
▼
Machine Learning Model
(Random Forest / Logistic Regression)
```

## Dataset
Telco Customer Churn Dataset [Source - Kaggle]

## Results
- Logistic Regression Accuracy: ~74%
- Random Forest Accuracy: ~76%
- Improved Recall for churn class using class_weight='balanced'

---
## Running the Project

### Run Backend


cd Backend
uvicorn main:app --reload


Backend runs at:


http://127.0.0.1:8000


Swagger API docs:


http://127.0.0.1:8000/docs


---

### Run Frontend


cd frontend
npm install
npm start


Frontend runs at:


http://localhost:3000


---

## Example Output


Prediction: 0
Probability: 39.86%
Customer not likely to churn

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
