import { useState } from "react";
import axios from "axios";

const WorkerVerificationModal = ({
  user,
  onClose,
}) => {
  const [form, setForm] = useState({
    idNumber: "",
    areaOfWork: "",
    otp: "",
  });

  const [files, setFiles] =
    useState({
      idFront: null,
      idBack: null,
      cv: null,
      certifications: null,
      profileImage: null,
      portfolio: null,
    });

  const [loading, setLoading] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  // TEXT INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // FILE INPUTS
  const handleFileChange = (
    e
  ) => {
    setFiles({
      ...files,
      [e.target.name]:
        e.target.files[0],
    });
  };

  // STEP 1 — SEND OTP
  const handleSubmit =
    async () => {
      if (
        !form.idNumber ||
        !form.areaOfWork
      ) {
        return alert(
          "Fill all required fields"
        );
      }

      if (
        !files.idFront ||
        !files.idBack ||
        !files.cv ||
        !files.certifications ||
        !files.profileImage
      ) {
        return alert(
          "Upload all required documents"
        );
      }

      try {
        setLoading(true);

        // SEND OTP
        await axios.post(
          `http://localhost:5000/api/verification/otp/send/${user._id}`
        );

        alert(
          "OTP sent to terminal"
        );

        setOtpSent(true);

      } catch (err) {
        console.log(err);

        alert(
          "Failed to send OTP"
        );
      } finally {
        setLoading(false);
      }
    };

  // STEP 2 — VERIFY OTP
  const verifyOtp =
    async () => {
      try {
        const res =
          await axios.post(
            `http://localhost:5000/api/verification/otp/verify/${user._id}`,
            {
              otp: form.otp,
            }
          );

        console.log(res.data);

        alert(
          "Verification successful"
        );

        window.location.reload();

      } catch (err) {
        console.log(err);

        alert("Invalid OTP");
      }
    };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        <h2 style={styles.title}>
          Worker Verification
        </h2>

        <p style={styles.subtitle}>
          Complete your
          verification to
          access jobs,
          chatting, and
          platform features.
        </p>

        {/* ===================== */}
        {/* TEXT INPUTS */}
        {/* ===================== */}

        <input
          type="text"
          name="idNumber"
          placeholder="National ID Number *"
          value={form.idNumber}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="areaOfWork"
          placeholder="Area Of Work *"
          value={form.areaOfWork}
          onChange={handleChange}
          style={styles.input}
        />

        {/* ===================== */}
        {/* FILES */}
        {/* ===================== */}

        <div style={styles.uploadBox}>
          <label>
            ID Front *
          </label>

          <input
            type="file"
            name="idFront"
            onChange={
              handleFileChange
            }
          />
        </div>

        <div style={styles.uploadBox}>
          <label>
            ID Back *
          </label>

          <input
            type="file"
            name="idBack"
            onChange={
              handleFileChange
            }
          />
        </div>

        <div style={styles.uploadBox}>
          <label>
            CV *
          </label>

          <input
            type="file"
            name="cv"
            onChange={
              handleFileChange
            }
          />
        </div>

        <div style={styles.uploadBox}>
          <label>
            Certifications *
          </label>

          <input
            type="file"
            name="certifications"
            onChange={
              handleFileChange
            }
          />
        </div>

        <div style={styles.uploadBox}>
          <label>
            Profile Picture *
          </label>

          <input
            type="file"
            name="profileImage"
            onChange={
              handleFileChange
            }
          />
        </div>

        <div style={styles.uploadBox}>
          <label>
            Portfolio
            (optional)
          </label>

          <input
            type="file"
            name="portfolio"
            onChange={
              handleFileChange
            }
          />
        </div>

        {/* ===================== */}
        {/* SEND OTP */}
        {/* ===================== */}

        {!otpSent && (
          <button
            style={styles.submitBtn}
            onClick={
              handleSubmit
            }
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : "Submit & Send OTP"}
          </button>
        )}

        {/* ===================== */}
        {/* OTP */}
        {/* ===================== */}

        {otpSent && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={
                handleChange
              }
              style={
                styles.input
              }
            />

            <button
              style={
                styles.verifyBtn
              }
              onClick={
                verifyOtp
              }
            >
              Verify OTP
            </button>
          </>
        )}

        <button
          style={styles.skipBtn}
          onClick={onClose}
        >
          Skip For Now
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
    background:
      "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "95%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
  },

  title: {
    color: "#0B2C59",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "20px",
    lineHeight: "1.5",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border:
      "1px solid #ccc",
  },

  uploadBox: {
    marginBottom: "15px",
  },

  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "#268426",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },

  verifyBtn: {
    width: "100%",
    padding: "14px",
    background: "#16437E",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },

  skipBtn: {
    width: "100%",
    padding: "14px",
    background: "#ccc",
    border: "none",
    borderRadius: "10px",
    marginTop: "15px",
    cursor: "pointer",
  },
};

export default WorkerVerificationModal;
