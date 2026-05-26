import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../../components/AuthNavbar";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "client",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered successfully");
      navigate("/login");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <AuthNavbar />

      <div style={styles.card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="firstName" placeholder="First Name" onChange={handleChange} style={styles.input} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} style={styles.input} />
          <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
          <input name="location" placeholder="Location" onChange={handleChange} style={styles.input} />

          <select name="role" onChange={handleChange} style={styles.input}>
            <option value="client">Client</option>
            <option value="worker">Worker</option>
          </select>

          <button style={styles.button}>Register</button>
        </form>

        <p style={styles.link}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#D2D7DF",
  },

  card: {
    width: "400px",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px",
    background: "#16437E",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  link: {
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default Register;