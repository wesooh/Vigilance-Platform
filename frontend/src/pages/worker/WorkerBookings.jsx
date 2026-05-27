import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";
import ChatBox from "../../components/chat/ChatBox";

const socket = io("http://localhost:5000");

const WorkerBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH BOOKINGS
  // =========================
  const fetchBookings = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/bookings/worker/${user._id}`
      );

      setBookings(res.data);
    } catch (err) {
      console.log("FETCH BOOKINGS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INIT + SOCKET
  // =========================
  useEffect(() => {
    if (!user?._id) return;

    fetchBookings();

    socket.emit("join-worker-room", user._id);

    const handleNewBooking = (booking) => {
      if (
        booking.worker?._id === user._id ||
        booking.worker === user._id
      ) {
        setBookings((prev) => [booking, ...prev]);
      }
    };

    socket.on("new-booking", handleNewBooking);

    return () => {
      socket.off("new-booking", handleNewBooking);
    };
  }, [user]);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (id, status) => {
    if (!user) return;

    // 🔥 FIXED VERIFICATION CHECK (IMPORTANT)
    if (user.verificationStatus !== "verified") {
      alert("Complete verification first");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status }
      );

      // refresh after update
      fetchBookings();
    } catch (err) {
      console.log("UPDATE STATUS ERROR:", err.response?.data || err.message);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (!user) {
    return <h3>Loading user...</h3>;
  }

  return (
    <div style={styles.container}>
      <h1>Booking Requests</h1>

      {loading && <p>Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p>No bookings yet</p>
      )}

      {!loading &&
        bookings.map((booking) => (
          <div key={booking._id} style={styles.card}>
            {/* CLIENT INFO */}
            <h3>
              {booking.client?.firstName || "Client"}{" "}
              {booking.client?.lastName || ""}
            </h3>

            <p>
              <b>Service:</b> {booking.serviceType}
            </p>

            <p>
              <b>Message:</b> {booking.message || "No message"}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span style={styles.status}>
                {booking.status}
              </span>
            </p>

            {/* =========================
                STATUS FLOW BUTTONS
            ========================= */}

            {booking.status === "requested" && (
              <div style={styles.buttonRow}>
                <button
                  style={styles.accept}
                  onClick={() =>
                    updateStatus(booking._id, "accepted")
                  }
                >
                  Accept
                </button>

                <button
                  style={styles.reject}
                  onClick={() =>
                    updateStatus(booking._id, "rejected")
                  }
                >
                  Reject
                </button>
              </div>
            )}

            {booking.status === "accepted" && (
              <button
                style={styles.primary}
                onClick={() =>
                  updateStatus(booking._id, "in-progress")
                }
              >
                Start Job
              </button>
            )}

            {booking.status === "in-progress" && (
              <button
                style={styles.primary}
                onClick={() =>
                  updateStatus(booking._id, "completed")
                }
              >
                Mark as Completed
              </button>
            )}

            {/* =========================
                CHAT (ONLY WHEN CLIENT EXISTS)
            ========================= */}
            {booking.client?._id && (
              <div style={{ marginTop: "15px" }}>
                <ChatBox
                  bookingId={booking._id}
                  receiverId={booking.client._id}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

// =========================
// STYLES (CLEANED + CONSISTENT)
// =========================
const styles = {
  container: {
    padding: "20px",
  },

  card: {
    border: "1px solid #ddd",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    background: "#fff",
  },

  status: {
    fontWeight: "bold",
    color: "#16437E",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  accept: {
    background: "#268426",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },

  reject: {
    background: "#c0392b",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },

  primary: {
    background: "#0B2C59",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default WorkerBookings;