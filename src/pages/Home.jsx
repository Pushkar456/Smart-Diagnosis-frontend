import { useState } from "react";
import { diagnosePatient } from "../server";

export default function Home() {
  const [form, setForm] = useState({
    symptoms: "",
    age: "",
    gender: "male",
    Duration: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  setLoading(true);
  setError("");
  setResult(null);

  try {
    const res = await diagnosePatient(form);

    if (!res || !res.success) {
      throw new Error("Invalid response");
    }

    let data;

    // ✅ Case 1: Already parsed JSON (BEST case)
    if (res.diagnosis.possible_conditions) {
      data = res.diagnosis;
    } 
    // ✅ Case 2: Raw string (fallback)
    else if (res.diagnosis.raw) {
      const clean = res.diagnosis.raw
        .replace(/```json\s*/i, "")
        .replace(/```/g, "")
        .trim();

      data = JSON.parse(clean);
    } 
    // ❌ Invalid response
    else {
      throw new Error("Invalid diagnosis format");
    }

    setResult(data);

  } catch (err) {
    console.error(err);
    setError("⚠️ Server error. Please wait and try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Symptoms</h2>

      <input
        style={styles.input}
        name="symptoms"
        placeholder="Symptoms (e.g. fever, cough)"
        onChange={handleChange}
      />

      <input
        style={styles.input}
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />

      <input
        style={styles.input}
        name="Duration"
        placeholder="Duration (e.g. 2 days)"
        onChange={handleChange}
      />

      <select style={styles.input} name="gender" onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button
        style={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Diagnosing..." : "Get Diagnosis"}
      </button>

      {/* 🔄 Spinner */}
      {loading && <div style={styles.spinner}></div>}

      {/* ❌ Error Message */}
      {error && <div style={styles.error}>{error}</div>}

      {/* ✅ Result */}
      {result && (
        <div style={styles.result}>
          <h3>Possible Conditions</h3>

          {result.possible_conditions.map((c, i) => (
            <div key={i} style={styles.card}>
              <b>{c.name}</b> - {c.probability}
              <p>{c.reason}</p>
            </div>
          ))}

          <h3>Recommended Steps</h3>
          <ul>
            {result.recommended_steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>

          <p><b>Severity:</b> {result.severity}</p>
          <p><i>{result.disclaimer}</i></p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "24px",
  },
  input: {
    width: "300px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "320px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  spinner: {
    marginTop: "10px",
    width: "30px",
    height: "30px",
    border: "4px solid #ccc",
    borderTop: "4px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
  result: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "350px",
  },
  card: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "6px",
    background: "#f1f5f9",
  },
};