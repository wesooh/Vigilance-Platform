import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WorkerVerificationModal from "../../components/worker/WorkerVerificationModal";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [verification, setVerification] = useState({
    isComplete: false,
    status: "incomplete",
    otpVerified: false,
  });

  useEffect(() => {
    if (user?._id) {
      checkStatus();
    }
  }, [user]);

  const checkStatus = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/verification/check/${user._id}`
      );

      setVerification(res.data);

      if (!res.data.isComplete) {
        setShowModal(false); // don't auto-force modal immediately
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const startVerification = () => {
    setShowModal(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Worker Dashboard</h1>

      {loading && <p>Checking verification status...</p>}

      {!loading && (
        <>
          {/* STATUS CARD */}
          <div style={styles.card}>
            <h3>Verification Status</h3>
            <p>
              Status: <b>{verification.status}</b>
            </p>

            <p>
              Profile Complete:{" "}
              <b>{verification.isComplete ? "Yes" : "No"}</b>
            </p>

            <p>
              OTP Verified:{" "}
              <b>{verification.otpVerified ? "Yes" : "No"}</b>
            </p>

            {!verification.isComplete && (
              <button
                onClick={startVerification}
                style={styles.button}
              >
                Complete Verification
              </button>
            )}
          </div>

          {/* MAIN CONTENT */}
          {verification.isComplete ? (
            <div style={styles.dashboard}>
              <h2>Welcome Worker 👋</h2>
              <p>Here are your active jobs, earnings and updates.</p>
            </div>
          ) : (
            <div style={styles.locked}>
              <p>
                You must complete verification to access jobs, bookings, and chat.
              </p>
            </div>
          )}
        </>
      )}

      {/* MODAL */}
      {showModal && (
        <WorkerVerificationModal
          user={user}
          onClose={() => {
            setShowModal(false);
            checkStatus(); // refresh after closing
          }}
        />
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#f5f7fb",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#268426",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  dashboard: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
  },
  locked: {
    padding: "20px",
    background: "#ffecec",
    color: "red",
    borderRadius: "10px",
  },
};

export default WorkerDashboard;