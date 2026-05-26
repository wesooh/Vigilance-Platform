import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      login(res.data);

      const role = res.data.user.role;

      if (role === "client") navigate("/client/dashboard");
      else if (role === "worker") navigate("/worker/dashboard");
      else navigate("/admin/dashboard");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <div style={styles.card}>
        <h2>Welcome Back</h2>
        <p style={styles.sub}>Login to continue</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />

          <button style={styles.button}>Login</button>
        </form>

        <p style={styles.link}>
          No account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </AuthLayout>
  );
};

const styles = {
  card: {
    width: "380px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  sub: {
    opacity: 0.6,
    marginBottom: "15px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    background: "#268426",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  link: {
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default Login;