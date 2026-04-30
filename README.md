# 🚀 Churn Intelligence Platform (Vercel Edition)A Machine Learning web app that predicts customer churn using a single deployment on Vercel (frontend + serverless backend).---## 🔥 Features- 👤 Single Customer Prediction- 📊 Churn Probability Output- ⚠ Risk Classification (High / Medium / Low)- 💡 Suggested Actions---## 🧠 Tech Stack### Frontend- React.js- Tailwind CSS### Backend (Serverless)- Python (Vercel Functions)- Scikit-learn- Pandas- Joblib---## 📂 Project Structure
frontend/
api/
predict.py        # serverless backend
backend/
model.pkl
features.pkl
src/
package.json
requirements.txt
---## 🚀 How It Works- User enters customer data- Frontend sends request to `/api/predict`- Vercel runs Python serverless function- Model predicts churn probability- Response is returned instantly---## 🔌 API Endpoint### 🔹 POST `/api/predict`**Request Example:**```json{  "tenure": 12,  "MonthlyCharges": 70,  "SeniorCitizen": 0,  "gender": "Male",  "Contract": "Month-to-month",  "InternetService": "DSL",  "PaymentMethod": "Electronic check"}

⚙️ Local Development
1️⃣ Install dependencies
pip install -r requirements.txtnpm install

2️⃣ Run frontend
npm start

🌐 Deployment
This project is designed to run entirely on:
👉 Vercel


Push code to GitHub


Import project in Vercel


Deploy



⚠️ Limitations


Serverless functions reload model (cold start delay)


Not ideal for large-scale bulk prediction


Best for demo / portfolio use



💡 Future Improvements


Bulk CSV prediction


Model optimization


Persistent backend service


Authentication system



👨‍💻 Author
Manish Agrawal
Abhay Singh
Gaurav kumar Bansal

⭐ Support
If you like this project, give it a ⭐ on GitHub!
---# 💬 DoneThis matches your **single deploy (Vercel-only)** setup.---If you want:👉 a more “startup-level” README (with badges, screenshots, etc.)say **“make it elite README”** 😈
