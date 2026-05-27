import { useState } from "react";
import axios from "axios";

const WorkerVerificationModal = ({ user, onClose }) => {
  const [form, setForm] = useState({
    idNumber: "",
    areaOfWork: "",
  });

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const submitVerification = async () => {
    if (!form.idNumber || !form.areaOfWork) {
      return alert("Fill all required fields");
    }

    if (!files.idFront || !files.idBack || !files.cv || !files.profileImage) {
      return alert("Missing required documents");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("idNumber", form.idNumber);
      data.append("areaOfWork", form.areaOfWork);

      Object.keys(files).forEach((key) => {
        data.append(key, files[key]);
      });

      await axios.post(
        `http://localhost:5000/api/auth/worker/verify/${user._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Verification submitted. OTP sent in backend.");
      onClose();

    } catch (err) {
      console.log(err);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Worker Verification</h2>

        <input
          name="idNumber"
          placeholder="ID Number"
          onChange={handleChange}
        />

        <input
          name="areaOfWork"
          placeholder="Area of Work"
          onChange={handleChange}
        />

        <input type="file" name="idFront" onChange={handleFile} />
        <input type="file" name="idBack" onChange={handleFile} />
        <input type="file" name="cv" onChange={handleFile} />
        <input type="file" name="profileImage" onChange={handleFile} />
        <input type="file" name="certifications" onChange={handleFile} />

        <button onClick={submitVerification} disabled={loading}>
          {loading ? "Submitting..." : "Submit Verification"}
        </button>

        <button onClick={onClose}>Close</button>
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
    background: "#fff",
    padding: "20px",
    width: "400px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default WorkerVerificationModal;