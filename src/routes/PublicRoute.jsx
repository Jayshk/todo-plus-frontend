import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ correct import

const PublicRoute = ({ children }) => {
  const { token } = useAuth();

  // If user is logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
