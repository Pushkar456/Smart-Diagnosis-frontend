export const diagnosePatient = async (data) => {
  console.log("api url",process.env.REACT_APP_API_URL)
  const res = await fetch(`${process.env.REACT_APP_API_URL}api/diagnose`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getHistory = async () => {
  console.log("api url",`${process.env.REACT_APP_API_URL}/api/history`)
  const res = await fetch(`${process.env.REACT_APP_API_URL}api/history`);
  return res.json();
};
