import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await api.post("/auth/logout"); // Clears token cookie
      } catch (err) {
        console.error("Logout error:", err);
      }

      navigate("/login");
    };

    doLogout();
  }, [navigate]);

  return <p>Logging out...</p>;
}
