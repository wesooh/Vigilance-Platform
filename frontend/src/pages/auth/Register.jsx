import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "client",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Registered successfully");
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="client">Client</option>
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
      <p>
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    style={{ color: "blue", cursor: "pointer" }}
  >
    Login
  </span>
</p>
    </div>
  );
};

export default Register;