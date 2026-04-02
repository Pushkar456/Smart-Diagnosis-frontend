export const API_BASE = "http://localhost:3000"; // change if needed

export const diagnosePatient = async (data) => {
  const res = await fetch(`${API_BASE}/api/diagnose`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getHistory = async () => {
  const res = await fetch(`${API_BASE}/api/history`);
  return res.json();
};
