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
    <div className="p-6 space-y-6 min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat title="Total" value={total} />
        <Stat title="Completed" value={completed} />
        <Stat title="Pending" value={pending} />
      </div>

      <TodoList />

      {loading && <p className="text-center text-gray-500 mt-4">Loading todos...</p>}
    </div>
  );
}

const Stat = ({ title, value }) => (
  <div className="p-4 border rounded-lg text-center bg-gray-50">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
);
