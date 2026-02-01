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
  const completed = todos.filter(t => t.status === "done").length;
  const pending = total - completed;

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <Navbar />

      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Stat title="Total" value={total} />
        <Stat title="Completed" value={completed} />
        <Stat title="Pending" value={pending} />
      </div>

      <TodoList />
    </div>
  );
}

const Stat = ({ title, value }) => (
  <div className="p-4 border rounded-lg text-center">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
);
