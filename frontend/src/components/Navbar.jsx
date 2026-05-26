import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const user = auth?.user;
  const logout = auth?.logout;

  const [showNavbar, setShowNavbar] =
    useState(true);

  const [lastScrollY, setLastScrollY] =
    useState(0);

  // 🔥 SMART NAVBAR
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY > lastScrollY
      ) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(
        window.scrollY
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    window.addEventListener(
      "click",
      () => setShowNavbar(true)
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [lastScrollY]);

  const refreshPage = () => {
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        ...styles.navbar,
        top: showNavbar
          ? "0"
          : "-100px",
      }}
    >
      {/* LOGO + NAME */}
      <div
        style={styles.logoArea}
        onClick={refreshPage}
      >
        <div style={styles.logo}>
          LOGO
        </div>

        <h2 style={styles.title}>
          Vigilance
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.actions}>
        {!user ? (
          <>
            <button
              style={styles.loginBtn}
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

            <button
              style={styles.signupBtn}
              onClick={() =>
                navigate("/register")
              }
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              style={styles.dashboardBtn}
              onClick={() =>
                navigate(
                  `/${user.role}/dashboard`
                )
              }
            >
              Dashboard
            </button>

            <button
              style={styles.logoutBtn}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    background: "#0B2C59",
    color: "#fff",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "15px 40px",
    zIndex: 1000,
    transition: "0.4s",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.2)",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },

  logo: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#268426",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "24px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  loginBtn: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  signupBtn: {
    background: "#268426",
    border: "none",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  dashboardBtn: {
    background: "#268426",
    border: "none",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  logoutBtn: {
    background: "#16437E",
    border: "none",
    color: "white",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Navbar;