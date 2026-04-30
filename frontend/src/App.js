import React, { useState, useRef } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip);

function App() {
  const [page, setPage] = useState("landing");
  const [mode, setMode] = useState(null);

  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [loading, setLoading] = useState(false);

  const chartRef = useRef();
  const [singleInput, setSingleInput] = useState({
  tenure: 12,
  MonthlyCharges: 70,
  SeniorCitizen: 0,
  gender: "Male",
  Contract: "Month-to-month",
  InternetService: "Fiber optic",
  PaymentMethod: "Electronic check",
});
const [singleResult, setSingleResult] = useState(null);

const handleSinglePredict = async () => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/predict",
      singleInput
    );
    setSingleResult(res.data);
  } catch (err) {
    alert("Prediction failed");
  }
};

  const handleUpload = async () => {
    if (!file) return alert("Upload CSV first");

    const fd = new FormData();
    fd.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/predict-bulk",
        fd
      );
      setResult(res.data);
      setPage("dashboard");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  let summary = { High: 0, Medium: 0, Low: 0 };

  result?.results?.forEach((r) => {
    summary[r.risk_level]++;
  });

  const pieData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [summary.High, summary.Medium, summary.Low],
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
      },
    ],
  };

  const filteredData =
    selectedRisk === "All"
      ? result?.results
      : result?.results?.filter((r) => r.risk_level === selectedRisk);

  const downloadChart = () => {
    const url = chartRef.current.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.png";
    link.click();
  };

  const downloadCSV = () => {
    const rows = result.results.map(
      (r) =>
        `${r.customer_id},${r.churn_probability},${r.risk_level},${r.suggested_action}`
    );
    const csv = "ID,Prob,Risk,Action\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "results.csv");
  };

  // LANDING
  if (page === "landing") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            🚀 Churn Intelligence
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            Predict. Prevent. Profit.
          </p>
          <button
            onClick={() => setPage("mode")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-xl text-lg hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // MODE


if (page === "mode") {
  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden text-white">

      {/* 🔥 Animated Background Glow */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full top-[-150px] left-[-150px]"
      />

      <motion.div
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
        className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]"
      />

      {/* 🔥 Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >

        {/* TITLE */}
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Choose Your Mode
        </h2>

        {/* TAGLINE */}
        <p className="text-gray-400 mb-12 text-lg">
          Smart decisions start with smart predictions
        </p>

        {/* CARDS */}
        <div className="flex gap-12 justify-center">

          {/* BULK CARD */}
          <motion.div
            whileHover={{ scale: 1.07, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setMode("bulk");
              setPage("dashboard");
            }}
            className="cursor-pointer backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-xl w-[260px] hover:border-purple-500"
          >
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl mb-2">Bulk Prediction</h3>
            <p className="text-gray-400 text-sm">
              Upload CSV and analyze churn patterns instantly
            </p>
          </motion.div>

          {/* SINGLE CARD */}
          <motion.div
            whileHover={{ scale: 1.07, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setMode("single");
              setPage("dashboard");
            }}
            className="cursor-pointer backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-xl w-[260px] hover:border-blue-500"
          >
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl mb-2">Single Prediction</h3>
            <p className="text-gray-400 text-sm">
              Predict churn for individual customers
            </p>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
}

  // DASHBOARD
  return (
  <div className="min-h-screen p-6 text-white relative overflow-hidden">

    {/* 🔥 Background Glow */}
    <motion.div
      animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
      transition={{ repeat: Infinity, duration: 12 }}
      className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-[-120px] left-[-120px]"
    />

    <motion.div
      animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
      transition={{ repeat: Infinity, duration: 15 }}
      className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px]"
    />

    {/* HEADER */}
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl text-center mb-10 z-10 relative"
    >
       🚀 Churn Intelligence Platform
    </motion.h1>

    {!result && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center mt-20"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl text-center w-[400px] shadow-xl">

          {mode === "bulk" && (
            <>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
              />

              <button
                onClick={handleUpload}
                disabled={loading}
                className={`w-full py-2 rounded-lg ${
                  loading ? "bg-gray-500" : "bg-green-600"
                }`}
              >
                {loading ? "Processing..." : "Upload CSV"}
              </button>
            </>
          )}

          {mode === "single" && (
  <div className="text-left">

    {/* TITLE */}
    <h2 className="text-xl mb-2 text-center">👤 Single Customer Prediction</h2>
    <p className="text-gray-400 text-sm mb-4 text-center">
      Enter customer details to predict churn risk
    </p>

    {/* FORM */}
<div className="grid grid-cols-2 gap-4">

  {/* TENURE */}
  <div>
    <label className="text-sm text-gray-400">Tenure (Months)</label>
    <input
      type="number"
      value={singleInput.tenure}
      onChange={(e) =>
        setSingleInput({ ...singleInput, tenure: Number(e.target.value) })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    />
  </div>

  {/* MONTHLY CHARGES */}
  <div>
    <label className="text-sm text-gray-400">Monthly Charges (₹)</label>
    <input
      type="number"
      value={singleInput.MonthlyCharges}
      onChange={(e) =>
        setSingleInput({
          ...singleInput,
          MonthlyCharges: Number(e.target.value),
        })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    />
  </div>

  {/* SENIOR */}
  <div>
    <label className="text-sm text-gray-400">Senior Citizen</label>
    <select
      value={singleInput.SeniorCitizen}
      onChange={(e) =>
        setSingleInput({
          ...singleInput,
          SeniorCitizen: Number(e.target.value),
        })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    >
      <option value={0}>No</option>
      <option value={1}>Yes</option>
    </select>
  </div>

  {/* GENDER */}
  <div>
    <label className="text-sm text-gray-400">Gender</label>
    <select
      value={singleInput.gender}
      onChange={(e) =>
        setSingleInput({
          ...singleInput,
          gender: e.target.value,
        })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    >
      <option>Male</option>
      <option>Female</option>
    </select>
  </div>

  {/* CONTRACT */}
  <div>
    <label className="text-sm text-gray-400">Contract</label>
    <select
      value={singleInput.Contract}
      onChange={(e) =>
        setSingleInput({ ...singleInput, Contract: e.target.value })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    >
      <option>Month-to-month</option>
      <option>One year</option>
      <option>Two year</option>
    </select>
  </div>

  {/* INTERNET */}
  <div>
    <label className="text-sm text-gray-400">Internet Service</label>
    <select
      value={singleInput.InternetService}
      onChange={(e) =>
        setSingleInput({
          ...singleInput,
          InternetService: e.target.value,
        })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    >
      <option>DSL</option>
      <option>Fiber optic</option>
      <option>No</option>
    </select>
  </div>

  {/* PAYMENT */}
  <div className="col-span-2">
    <label className="text-sm text-gray-400">Payment Method</label>
    <select
      value={singleInput.PaymentMethod}
      onChange={(e) =>
        setSingleInput({
          ...singleInput,
          PaymentMethod: e.target.value,
        })
      }
      className="w-full mt-1 p-2 rounded bg-slate-800 text-white"
    >
      <option>Electronic check</option>
      <option>Mailed check</option>
      <option>Bank transfer</option>
      <option>Credit card</option>
    </select>
  </div>

</div>

    {/* BUTTON */}
    <button
      onClick={handleSinglePredict}
      className="bg-blue-600 w-full py-2 rounded mt-4 hover:bg-blue-700 transition"
    >
      Predict Churn
    </button>

    {/* RESULT */}
    {singleResult && (
      <div className="mt-4 p-4 bg-white/10 rounded text-center">

        <p className="text-lg font-semibold">
          📉 Probability: {singleResult.churn_probability}
        </p>

        <p
          className={`mt-2 font-bold ${
            singleResult.risk_level === "High"
              ? "text-red-400"
              : singleResult.risk_level === "Medium"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          ⚠ Risk: {singleResult.risk_level}
        </p>

        <p className="mt-2 text-sm text-gray-300">
          💡 {singleResult.suggested_action}
        </p>

      </div>
    )}

  </div>
)}

        </div>
      </motion.div>
    )}

    {result && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-12 gap-6 max-w-7xl mx-auto relative z-10"
      >

        {/* LEFT PANEL */}
        <div className="col-span-3 backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-3"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-2 rounded-lg mb-6 ${
              loading ? "bg-gray-500" : "bg-green-600"
            }`}
          >
            {loading ? "Processing..." : "Upload CSV"}
          </button>

          {/* KPI CARDS */}
          <div className="space-y-3">
            {[
              { label: "High", value: summary.High, color: "bg-red-500/20" },
              { label: "Medium", value: summary.Medium, color: "bg-yellow-400/20" },
              { label: "Low", value: summary.Low, color: "bg-green-500/20" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`${item.color} p-3 rounded text-center`}
              >
                {item.label}: {item.value}
              </motion.div>
            ))}
          </div>

          {/* FILTER */}
          <div className="mt-6 space-y-2">
            {["All", "High", "Medium", "Low"].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRisk(r)}
                className={`w-full py-2 rounded ${
                  selectedRisk === r ? "bg-purple-600" : "bg-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-9 space-y-6">

          {/* 🔥 GRAPH CARD */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl grid grid-cols-2 items-center"
          >

            <div className="space-y-4">
              <h2 className="text-lg mb-2">Risk Distribution</h2>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                High: {summary.High}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                Medium: {summary.Medium}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Low: {summary.Low}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-[260px]">
                <Pie
                  ref={chartRef}
                  data={pieData}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </div>
            </div>

          </motion.div>

          {/* 🔥 TABLE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl max-h-72 overflow-y-auto shadow-xl"
          >
            {filteredData.map((r, i) => (
              <div
                key={i}
                className="flex justify-between p-3 border-b border-white/10 hover:bg-white/5 transition"
              >
                <span>{r.customer_id}</span>
                <span>{r.churn_probability}</span>
                <span>{r.risk_level}</span>
                <span>{r.suggested_action}</span>
              </div>
            ))}
          </motion.div>

        </div>

      </motion.div>
    )}

  </div>
);
}

export default App;