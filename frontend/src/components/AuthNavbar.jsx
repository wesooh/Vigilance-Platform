import { useNavigate } from "react-router-dom";

const AuthNavbar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        Vigilance
      </h2>

      <button
        style={styles.homeBtn}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
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
  },

  logo: {
    cursor: "pointer",
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