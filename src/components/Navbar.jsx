import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <div style={styles.logo}>🩺 SmartDiag</div>
       <Link to="/" style={styles.link}>Home</Link>
      <Link to="/history" style={styles.link}>History</Link>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#0f172a",
    color: "white",
  },
  logo: { fontSize: "20px", fontWeight: "bold" },
  link: { color: "white", textDecoration: "none" },
};
