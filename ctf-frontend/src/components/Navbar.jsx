import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/challenges">Challenges</Link>

        {user?.isAdmin && <Link style={styles.link} to="/admin">Admin</Link>}
      </div>

      <div style={styles.right}>
        {!user ? (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hi, {user.username}</span>
            <button style={styles.button} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#222",
    color: "white",
  },
  left: { display: "flex", gap: "15px" },
  right: { display: "flex", gap: "15px", alignItems: "center" },
  link: { color: "white", textDecoration: "none" },
  button: {
    background: "transparent",
    border: "1px solid white",
    padding: "6px 12px",
    color: "white",
    cursor: "pointer",
  }
};
