import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // No token → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Optional: basic JWT structure check
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // Invalid token format
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}
