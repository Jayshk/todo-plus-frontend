import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { fetchTodos } from "../services/todos";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = todos.length;
  const completed = todos.filter(t => t.status === "done").length;
  const pending = total - completed;

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Stat title="Total" value={total} />
        <Stat title="Completed" value={completed} />
        <Stat title="Pending" value={pending} />
      </div>

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

const Stat = ({ title, value }) => (
  <div className="p-4 border rounded-lg text-center">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-xl">{value}</p>
  </div>
);
