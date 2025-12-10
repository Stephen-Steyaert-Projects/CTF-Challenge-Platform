import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import api from "../api/api.js";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async ({ username, password }) => {
    try {
      await api.post("/auth/register", { username, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AuthForm onSubmit={handleRegister} submitLabel="Register" />
    </div>
  );
}
