import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import api from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  // const [error, setError] = useState(null);

  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { username, password });
    setUser(res.data);
    navigate("/");
  };


  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <AuthForm onSubmit={handleLogin} submitLabel="Login" />
    </div>
  );
}
