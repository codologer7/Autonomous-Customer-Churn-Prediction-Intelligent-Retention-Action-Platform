Try Our Platform [Here](https://churn-frontend-mv4h.onrender.com/)
<h1>Autonomous Customer Churn Prediction & Intelligent Retention Platform</h1>
  <p>
    <strong>Predict customer churn before it happens and take autonomous action to retain your most valuable users.</strong>
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Python-3.10+-blue.svg" alt="Python" />
    <img src="https://img.shields.io/badge/FastAPI-0.100+-009688.svg" alt="FastAPI" />
    <img src="https://img.shields.io/badge/React-18.x-61DAFB.svg" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/Machine%20Learning-Scikit%20Learn-F7931E.svg" alt="Scikit Learn" />
  </p>
</div>

---

## 🏆 The Problem
Customer retention is one of the biggest challenges for subscription-based businesses and telecom companies. Acquiring a new customer can cost **five times more** than retaining an existing one. Currently, businesses often react to churn *after* the customer has already left or canceled, leading to irreversible revenue loss.

## 💡 Our Solution
We built an **Intelligent Retention Action Platform** that uses a Machine Learning model to analyze customer data, predict churn probability in real-time, and **autonomously suggest retention actions** based on the calculated risk level. 

Instead of just showing a probability, our system directly answers: *"What should we do right now to keep this customer?"*

## ✨ Key Features
- **🚀 Real-Time Prediction API**: Instantly evaluate single customer data points.
- **📂 Bulk Analysis**: Upload a CSV of your entire customer base and instantly get a targeted action plan for everyone.
- **🧠 Intelligent Risk Profiling**: 
  - 🔴 **High Risk** (>75%): Autonomous trigger for **"Call + Offer Discount"**.
  - 🟡 **Medium Risk** (50-75%): Autonomous trigger for **"Send Email Offer"**.
  - 🟢 **Low Risk** (<50%): Tagged for **"Monitor Customer"**.
- **📊 Beautiful Dashboard**: A sleek, modern React frontend built with TailwindCSS, Chart.js, and Framer Motion for interactive data visualization.
- **⚡ Blazing Fast Backend**: Powered by FastAPI, offering incredibly low-latency predictions.

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Chart.js](https://www.chartjs.org/) - Data Visualizations
- [Axios](https://axios-http.com/) - API Communication

**Backend & Machine Learning:**
- [FastAPI](https://fastapi.tiangolo.com/) - High-performance Web Framework
- [Pandas](https://pandas.pydata.org/) - Data Manipulation
- [Scikit-Learn](https://scikit-learn.org/) - Machine Learning Model
- [Joblib](https://joblib.readthedocs.io/) - Model Serialization

---

## 💻 Running the Project Locally

### Prerequisites
Make sure you have **Node.js** and **Python 3.9+** installed on your machine.

### 1. Setting up the Backend
Navigate to the backend directory and run the FastAPI server.
```bash
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```
The backend will now be running at `http://127.0.0.1:8000`. You can access the automatic interactive API documentation at `http://127.0.0.1:8000/docs`.

### 2. Setting up the Frontend
Open a new terminal, navigate to the frontend directory, and start the React app.
```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm start
```
The frontend application will start and open automatically in your browser at `http://localhost:3000`.

---

## 📡 API Reference

### 1. Single Prediction
`POST /predict`
Analyzes a single customer and returns risk profiling.
```json
// Request Body Example
{
  "tenure": 12,
  "MonthlyCharges": 85.5,
  "Contract_Month-to-month": 1,
  // ... other features
}

// Response Example
{
  "churn_probability": 0.82,
  "risk_level": "High",
  "suggested_action": "Call + Offer Discount"
}
```

### 2. Bulk Prediction
`POST /predict-bulk`
Upload a CSV dataset of multiple customers to get predictions for the entire batch. Returns an array of customer IDs with their respective risk levels and suggested actions.

---

## 🚀 Future Roadmap
- [ ] **CRM Integrations:** Direct Webhooks to Salesforce/HubSpot to automatically dispatch emails/calls without human intervention.
- [ ] **LLM Integration:** Generative AI to craft personalized email templates based on the specific features causing the churn risk (e.g., "We saw you had issues with your internet speed...").
- [ ] **Continuous Learning Pipeline:** Automatically retrain the model as new churn data flows in.

---

<div align="center">
  <b>Built with ❤️ for the Hackathon!</b>
</div>
