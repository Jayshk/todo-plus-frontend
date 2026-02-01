import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Default redirect */}
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
