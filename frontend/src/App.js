import React, { useState } from "react";
import axios from "axios";

function App() {

const [result, setResult] = useState(null);

const features = [
1,0,1,0,12,
1,0,1,0,1,
0,0,1,0,1,
1,1,2,70,900,
0,0,0,0,0,
0,0,0,0,0
];

const predict = async () => {
try {
const response = await axios.post(
"http://127.0.0.1:8000/predict/customer",
{ features: features }
);

  setResult(response.data);

} catch (error) {
  console.error("API ERROR:", error);
}

};

return (
<div style={{ textAlign: "center", marginTop: "100px" }}>

  <h1>Customer Churn Prediction</h1>

  <button onClick={predict}>
    Predict Churn
  </button>

  {result && (
    <div>
      <h2>Prediction: {result.prediction}</h2>
      <h3>Probability: {(result.probability * 100).toFixed(2)}%</h3>
      <p>{result.message}</p>
    </div>
  )}

</div>

);
}

export default App;