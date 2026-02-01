import { useEffect } from "react";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import { useTodos } from "../context/TodoContext";

export default function Dashboard() {
  const { todos, loading, loadTodos } = useTodos();

  useEffect(() => {
    loadTodos();
  }, []);

  const total = todos.length;
  const completed = todos.filter((t) => t.status === "done").length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage your daily tasks efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat
            title="Total Tasks"
            value={total}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <Stat
            title="Completed"
            value={completed}
            color="text-green-600"
            bg="bg-green-50"
          />
          <Stat
            title="Pending"
            value={pending}
            color="text-orange-600"
            bg="bg-orange-50"
          />
        </div>

        {/* Todo Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-3 text-blue-600">Your Todos</h2>
          <TodoList />
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading todos...</p>
        )}
      </div>
    </div>
  );
}

const Stat = ({ title, value, color, bg }) => (
  <div className={`p-5 rounded-xl shadow-sm ${bg}`}>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);
