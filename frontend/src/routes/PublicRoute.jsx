import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    const role = user.role;

    if (role === "client") {
      return <Navigate to="/client/dashboard" />;
    }

    if (role === "worker") {
      return <Navigate to="/worker/dashboard" />;
    }

    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return children;
};

export default PublicRoute;