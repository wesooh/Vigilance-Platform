import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const clientLinks = [
    {
      name: "Dashboard",
      path: "/client/dashboard"
    },
    {
      name: "Find Workers",
      path: "/client/find-workers"
    },
    {
      name: "Messages",
      path: "/client/messages"
    },
    {
      name: "Notifications",
      path: "/client/notifications"
    },
    {
      name: "Saved Workers",
      path: "/client/saved-workers"
    },
    {
      name: "Settings",
      path: "/client/settings"
    },
  ];

  const workerLinks = [
    {
      name: "Dashboard",
      path: "/worker/dashboard"
    },
    {
      name: "My Jobs",
      path: "/worker/my-jobs"
    },
    {
      name: "Earnings",
      path: "/worker/earnings"
    },
    {
      name: "Availability",
      path: "/worker/availability"
    },
    {
      name: "Reviews",
      path: "/worker/reviews"
    },
    {
      name: "Settings",
      path: "/worker/settings"
    },
    {
      name: "Edit Profile",
      path: "/worker/edit-profile",
    },
    {
      name: "My Bookings",
      path: "/worker/bookings",
    },
  ];

  const adminLinks = [
    {
      name: "Overview",
      path: "/admin/overview"
    },
    {
      name: "Worker Approvals",
      path: "/admin/worker-approvals"
    },
    {
      name: "Users",
      path: "/admin/users"
    },
    {
      name: "Reports",
      path: "/admin/reports"
    },
    {
      name: "Payments",
      path: "/admin/payments"
    },
  ];

  let links = [];

  if (user?.role === "client") {
    links = clientLinks;
  } else if (user?.role === "worker") {
    links = workerLinks;
  } else if (user?.role === "admin") {
    links = adminLinks;
  }

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Vigilance</h2>

      <div style={styles.links}>
        {links.map((link, index) => (
  <div key={index} style={styles.link}>
    <Link
      to={link.path}
      style={{ color: "white", textDecoration: "none" }}
    >
      {link.name}
    </Link>
  </div>
))}
      </div>

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
  },

  logo: {
    marginBottom: "30px",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  link: {
    padding: "10px",
    background: "#16437E",
    borderRadius: "5px",
    cursor: "pointer",
  },

  logout: {
    padding: "10px",
    background: "#268426",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  active: {
    background: "#268426",
  }
};

export default Sidebar;