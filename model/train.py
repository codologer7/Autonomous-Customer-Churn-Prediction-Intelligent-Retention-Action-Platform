import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("WA_Fn-UseC_-Telco-Customer-Churn.csv")

# Drop unnecessary column
df.drop("customerID", axis=1, inplace=True)

# Convert TotalCharges to numeric
df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors='coerce')

# Remove missing values
df.dropna(inplace=True)

# Convert target variable (Churn)
df["Churn"] = df["Churn"].map({"Yes": 1, "No": 0})

# Split features and target
X = df.drop("Churn", axis=1)
y = df["Churn"]

# Convert categorical columns into numeric
X = pd.get_dummies(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {acc:.2f}")

# Save model
joblib.dump(model, "model.pkl")

# Save feature columns (VERY IMPORTANT for backend)
joblib.dump(X.columns.tolist(), "features.pkl")

print("Model and features saved successfully!")