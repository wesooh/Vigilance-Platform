import { useEffect, useState } from "react";
import axios from "axios";

const VerificationModal = ({ user, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    idNumber: "",
    areaOfWork: "",
    cv: "",
  });

  useEffect(() => {
    if (user?._id) {
      sendOTP();
    }
  }, [user]);

  const sendOTP = async () => {
    await axios.post(
      `http://localhost:5000/api/verification/request/${user._id}`
    );
    setOtpSent(true);
  };

  const handleSubmit = async () => {
    await axios.post(
      `http://localhost:5000/api/verification/verify/${user._id}`,
      {
        otp,
        data: form,
      }
    );

    alert("Verified!");
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Complete Your Profile</h2>

        <p>You can skip, but you won't access full features.</p>

        <input
          placeholder="ID Number"
          onChange={(e) =>
            setForm({ ...form, idNumber: e.target.value })
          }
        />

        <input
          placeholder="Area of Work"
          onChange={(e) =>
            setForm({ ...form, areaOfWork: e.target.value })
          }
        />

        <input
          placeholder="CV Link"
          onChange={(e) =>
            setForm({ ...form, cv: e.target.value })
          }
        />

        {otpSent && (
          <input
            placeholder="Enter OTP (check terminal)"
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        <button onClick={handleSubmit}>
          Submit Verification
        </button>

        <button onClick={onClose}>
          Skip for now
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default VerificationModal;