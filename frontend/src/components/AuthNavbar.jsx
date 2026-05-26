import { useNavigate } from "react-router-dom";

const AuthNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.left} onClick={() => navigate("/")}>
        <div style={styles.logoCircle}>V</div>
        <h2 style={styles.title}>Vigilance</h2>
      </div>

      <button style={styles.homeBtn} onClick={() => navigate("/")}>
        Back to Home
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",
    background: "#0B2C59",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    color: "white",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },

  logoCircle: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#268426",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  title: {
    fontSize: "20px",
  },

  homeBtn: {
    background: "#268426",
    border: "none",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AuthNavbar;