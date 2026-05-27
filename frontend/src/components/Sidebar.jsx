import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const workerLinks = [
    { name: "Dashboard", path: "/worker/dashboard" },
    { name: "My Jobs", path: "/worker/bookings" },
    { name: "Earnings", path: "/worker/earnings" },
    { name: "Edit Profile", path: "/worker/edit-profile" },
    { name: "Settings", path: "/worker/settings" },
  ];

  return (
    <div style={styles.sidebar}>

      {/* TOP USER BLOCK */}
      <div style={styles.userBox}>
        <h3>{user?.firstName}</h3>
        <p style={styles.role}>{user?.role}</p>
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        {workerLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            style={{
              ...styles.link,
              background:
                location.pathname === link.path
                  ? "#268426"
                  : "#16437E",
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        style={styles.logout}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    background: "#0B2C59",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
  },

  userBox: {
    marginBottom: "20px",
  },

  role: {
    fontSize: "12px",
    opacity: 0.7,
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },

  link: {
    padding: "10px",
    borderRadius: "5px",
    color: "white",
    textDecoration: "none",
  },

  logout: {
    padding: "10px",
    background: "#268426",
    border: "none",
    color: "white",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Sidebar;