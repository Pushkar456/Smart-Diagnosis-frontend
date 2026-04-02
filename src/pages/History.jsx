import { useEffect, useState } from "react";
import { getHistory } from "../server.jsx";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory();
      setHistory(res);
    };
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Diagnosis History</h2>

      {history.map((item, i) => {
        let data;
        try {
          data = JSON.parse(item.diagnosis.raw.replace(/```json|```/g, ""));
        } catch {
          data = null;
        }
        return (
          <div key={i} style={styles.card}>
            <p><b>Symptoms:</b> {item.symptoms}</p>
            {data && (
              <>
                <p><b>Top Condition:</b> {data.possible_conditions[0].name}</p>
                <p><b>Severity:</b> {data.severity}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginTop: "10px",
  },
};
