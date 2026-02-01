import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <h1 className="text-lg font-bold tracking-tight text-white bg-purple-600 p-2 rounded-2xl">
        Todo App
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm font-medium text-red-500 hover:text-red-600 transition cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
}
