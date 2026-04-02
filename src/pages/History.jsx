import { useEffect, useState } from "react";
import { getHistory } from "../server";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Diagnosis History</h2>

      {history.length === 0 && <p>No history found</p>}

      {history.map((item, i) => (
        <div key={i} style={styles.card}>
          {/* Symptoms */}
          <p>
            <b>Symptoms:</b> {item.symptoms}
          </p>

          {/* Date & Time */}
          <p style={styles.date}>
            {new Date(item.createdAt).toLocaleString()}
          </p>

          {/* Results */}
          <div style={styles.results}>
            <b>Results:</b>
            {item.result.map((r, index) => (
              <div key={index} style={styles.resultItem}>
                <p><b>{r.condition}</b> ({r.probability})</p>
                <p style={styles.nextStep}>👉 {r.nextSteps}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  },
  date: {
    fontSize: "12px",
    color: "gray",
    marginBottom: "10px",
  },
  results: {
    marginTop: "10px",
  },
  resultItem: {
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "8px",
  },
  nextStep: {
    fontSize: "13px",
    color: "#2563eb",
  },
};