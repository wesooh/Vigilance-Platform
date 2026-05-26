import { useState } from "react";
import axios from "axios";

const WorkerVerificationModal = ({ user, onClose }) => {
  const [form, setForm] = useState({
    idNumber: "",
    areaOfWork: "",
  });

  const [files, setFiles] = useState({
    idFront: null,
    idBack: null,
    cv: null,
    certifications: null,
    profileImage: null,
    portfolio: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    if (!form.idNumber || !form.areaOfWork) {
      return alert("Fill all required fields");
    }

    if (
      !files.idFront ||
      !files.idBack ||
      !files.cv ||
      !files.certifications ||
      !files.profileImage
    ) {
      return alert("Upload all required documents");
    }

    try {
      setLoading(true);

      const data = new FormData();

      // TEXT FIELDS
      data.append("idNumber", form.idNumber);
      data.append("areaOfWork", form.areaOfWork);

      // FILES
      data.append("idFront", files.idFront);
      data.append("idBack", files.idBack);
      data.append("cv", files.cv);
      data.append("certifications", files.certifications);
      data.append("profileImage", files.profileImage);

      // OPTIONAL
      if (files.portfolio) {
        data.append("portfolio", files.portfolio);
      }

      const res = await axios.post(
        `http://localhost:5000/api/auth/worker/verify/${user._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Verification submitted. OTP sent!");

      console.log(res.data);

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
        <h2>Complete Your Verification</h2>

        <p>Required fields marked *</p>

        {/* TEXT INPUTS */}
        <input
          name="idNumber"
          placeholder="ID Number *"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="areaOfWork"
          placeholder="Area of Work *"
          onChange={handleChange}
          style={styles.input}
        />

        {/* FILE INPUTS */}
        <label>ID Front *</label>
        <input
          type="file"
          name="idFront"
          onChange={handleFileChange}
        />

        <label>ID Back *</label>
        <input
          type="file"
          name="idBack"
          onChange={handleFileChange}
        />

        <label>CV *</label>
        <input
          type="file"
          name="cv"
          onChange={handleFileChange}
        />

        <label>Certifications *</label>
        <input
          type="file"
          name="certifications"
          onChange={handleFileChange}
        />

        <label>Profile Picture *</label>
        <input
          type="file"
          name="profileImage"
          onChange={handleFileChange}
        />

        <label>Portfolio (optional)</label>
        <input
          type="file"
          name="portfolio"
          onChange={handleFileChange}
        />

        {/* BUTTONS */}
        <button onClick={handleSubmit} disabled={loading} style={styles.submit}>
          {loading ? "Submitting..." : "Submit & Send OTP"}
        </button>

        <button onClick={onClose} style={styles.cancel}>
          Cancel
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
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },

  submit: {
    width: "100%",
    padding: "12px",
    background: "#268426",
    color: "#fff",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },

  cancel: {
    width: "100%",
    padding: "12px",
    background: "#ccc",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default WorkerVerificationModal;