import { useState } from "react";
import axios from "axios";

const WorkerVerificationModal = ({ user, onClose }) => {
  const [form, setForm] = useState({
    idNumber: "",
    areaOfWork: "",
    otp: "",
  });

  const [files, setFiles] = useState({});

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("idNumber", form.idNumber);
      data.append("areaOfWork", form.areaOfWork);

      Object.keys(files).forEach((key) => {
        data.append(key, files[key]);
      });

      // STEP 1: SEND OTP (terminal)
      await axios.post(
        `http://localhost:5000/api/verification/otp/send/${user._id}`
      );

      alert("OTP sent (check terminal)");

    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/verification/otp/verify/${user._id}`,
        { otp: form.otp }
      );

      alert("Verified successfully");
      onClose();
    } catch (err) {
      alert("OTP failed");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Worker Verification</h2>

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

        <button onClick={handleSubmit}>
          Submit & Send OTP
        </button>

        <hr />

        <input
          placeholder="Enter OTP"
          onChange={(e) =>
            setForm({ ...form, otp: e.target.value })
          }
        />

        <button onClick={verifyOtp}>
          Verify OTP
        </button>

        <button onClick={onClose}>
          Close
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
  },
  modal: {
    background: "white",
    padding: "20px",
    width: "400px",
  },
};

export default WorkerVerificationModal;