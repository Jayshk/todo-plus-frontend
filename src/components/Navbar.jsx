import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="font-semibold">Todo App</h1>
      <button
        onClick={logout}
        className="text-red-600 text-sm"
      >
        Logout
      </button>
    </div>
  );
}
