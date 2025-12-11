import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <nav>
      <Link to="/">Home</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          {user.isAdmin && <Link to="/admin">Admin</Link>}
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
}
