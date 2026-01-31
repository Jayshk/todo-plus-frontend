import React, { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import AddTodo from "../components/AddTodo";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await apiFetch("/todos"); // use apiFetch
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTodoAdded = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Total Todos</h3>
          <p>{total}</p>
        </div>
        <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>
        <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
      </div>

      <AddTodo onTodoAdded={handleTodoAdded} />

      <h2>Recent Todos</h2>
      <ul>
        {todos.slice(-5).reverse().map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Done" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
