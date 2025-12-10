import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import api from "../api/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async ({ username, password }) => {
    try {
      await api.post("/auth/login", { username, password });
      navigate("/"); // redirect to home
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AuthForm onSubmit={handleLogin} submitLabel="Login" />
    </div>
  );
}
