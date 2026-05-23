import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", form);

    login(res.data);

    const role = res.data.user.role;

if (role === "client") {
  navigate("/client/dashboard");
}

if (role === "worker") {
  navigate("/worker/dashboard");
}

if (role === "admin") {
  navigate("/admin/dashboard");
}

    alert("Login successful");

    if (res.data.user.role === "client") {
  navigate("/client/dashboard");
} else if (res.data.user.role === "worker") {
  navigate("/worker/dashboard");
} else if (res.data.user.role === "admin") {
  navigate("/admin/dashboard");
}
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />

        <button type="submit">Login</button>
        <p>
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    style={{ color: "blue", cursor: "pointer" }}
  >
    Register
  </span>
</p>
      </form>
    </div>
  );
};

export default Login;