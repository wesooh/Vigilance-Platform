import { useState } from "react";
import axios from "axios";

const WorkerVerificationModal = ({ user, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOTP = async () => {
    await axios.post(
      `http://localhost:5000/api/verification/otp/send/${user._id}`
    );

    setOtpSent(true);
  };

  const verifyOTP = async () => {
    const res = await axios.post(
      `http://localhost:5000/api/verification/otp/verify/${user._id}`,
      { otp }
    );

    alert(res.data.message);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Complete Verification</h2>

        <p>
          You can skip for now, but you MUST verify to:
          <br />• Apply for jobs
          <br />• Chat with clients
        </p>

        {!otpSent ? (
          <button onClick={sendOTP} style={styles.btn}>
            Send OTP
          </button>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />

            <button onClick={verifyOTP} style={styles.btn}>
              Verify
            </button>
          </>
        )}

        <button onClick={onClose} style={styles.skip}>
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
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
  },

  btn: {
    background: "#268426",
    color: "white",
    padding: "10px",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
    width: "100%",
  },

  skip: {
    marginTop: "10px",
    background: "transparent",
    border: "none",
    color: "gray",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
  },
};

export default WorkerVerificationModal;