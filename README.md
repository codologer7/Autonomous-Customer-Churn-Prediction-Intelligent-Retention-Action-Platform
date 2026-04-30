n Churn Intelligence Platform
Predict. Prevent. Retain.
Overview:
A Machine Learning web app that predicts customer churn and provides actionable insights through
an interactive dashboard.
Features:
- Bulk CSV Prediction
- Single Customer Prediction
- Risk Dashboard (High / Medium / Low)
- Action Suggestions
Tech Stack:
React, Tailwind, FastAPI, Scikit-learn, Pandas, Chart.js
Structure:
backend ® API + model
frontend ® UI
Run Locally:
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
cd frontend
npm install
npm start
API Example:
{
"tenure": 12,
"MonthlyCharges": 70,
"SeniorCitizen": 0,
"gender": "Male",
"Contract": "Month-to-month"
}
Deployment:
Frontend ® Vercel
Backend ® Python service
Author:
Manish Agrawal
