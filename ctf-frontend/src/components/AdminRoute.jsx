import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // logged in but NOT admin
  if (!user.isAdmin) return <Navigate to="/" replace />;

  return children;
}
