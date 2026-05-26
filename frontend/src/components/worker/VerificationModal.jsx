import { useState } from "react";

const VerificationModal = ({ user, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    idNumber: "",
    idFrontImage: null,
    idBackImage: null,
    cv: null,
    certifications: [],
    portfolio: [],
    profileImage: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    const data = new FormData();

    data.append("idNumber", form.idNumber);
    data.append("idFrontImage", form.idFrontImage);
    data.append("idBackImage", form.idBackImage);
    data.append("cv", form.cv);
    data.append("profileImage", form.profileImage);

    // optional arrays
    data.append("certifications", JSON.stringify(form.certifications));
    data.append("portfolio", JSON.stringify(form.portfolio));

    onSubmit(data);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Complete Your Worker Profile</h2>

        <p style={{ fontSize: "14px", opacity: 0.7 }}>
          You can skip this, but you won’t be able to apply for jobs or chat until it's completed.
        </p>

        <input
          name="idNumber"
          placeholder="ID Number"
          onChange={handleChange}
          style={styles.input}
        />

        <label>ID Front</label>
        <input type="file" name="idFrontImage" onChange={handleFileChange} />

        <label>ID Back</label>
        <input type="file" name="idBackImage" onChange={handleFileChange} />

        <label>Profile Picture</label>
        <input type="file" name="profileImage" onChange={handleFileChange} />

        <label>CV</label>
        <input type="file" name="cv" onChange={handleFileChange} />

        <div style={styles.buttons}>
          <button onClick={handleSubmit} style={styles.primary}>
            Submit Verification
          </button>

          <button onClick={onClose} style={styles.secondary}>
            Skip for now
          </button>
        </div>
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
    width: "420px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  primary: {
    background: "#268426",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  secondary: {
    background: "#16437E",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default VerificationModal;