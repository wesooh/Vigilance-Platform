import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WorkerVerificationModal from "../../components/worker/VerificationModal";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    bookings: 0,
    earnings: 0,
    completed: 0,
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?._id) {
      checkStatus();
      fetchBookings();
    }
  }, [user]);

  const checkStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/verification/check/${user._id}`
      );

      if (!res.data.isComplete) {
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/worker/${user._id}`
      );

      setBookings(res.data);

      setStats({
        bookings: res.data.length,
        completed: res.data.filter(b => b.status === "completed").length,
        earnings: 0, // you can connect later to payments endpoint
      });
    } catch (err) {
      console.log(err);
    }
  };

  const completion =
    user?.isProfileComplete ? 100 : 60;

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>Welcome back, {user?.firstName}</h1>

        <p style={{ color: user?.isVerified ? "green" : "orange" }}>
          Status: {user?.isVerified ? "Verified Worker" : "Not Verified"}
        </p>
      </div>

      {/* PROFILE COMPLETION */}
      <div style={styles.card}>
        <h3>Profile Completion</h3>
        <div style={styles.bar}>
          <div
            style={{
              ...styles.fill,
              width: `${completion}%`,
            }}
          />
        </div>
        <p>{completion}% complete</p>
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <h3>Bookings</h3>
          <p>{stats.bookings}</p>
        </div>

        <div style={styles.statCard}>
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>

        <div style={styles.statCard}>
          <h3>Earnings</h3>
          <p>KES {stats.earnings}</p>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div style={styles.card}>
        <h3>Recent Bookings</h3>

        {bookings.slice(0, 3).map((b) => (
          <div key={b._id} style={styles.booking}>
            <p><b>{b.serviceType}</b></p>
            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <WorkerVerificationModal
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },

  header: {
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#0B2C59",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },

  bar: {
    width: "100%",
    height: "10px",
    background: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    background: "#268426",
  },

  booking: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};

export default WorkerDashboard;