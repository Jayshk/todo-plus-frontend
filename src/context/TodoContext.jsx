import { createContext, useContext, useState } from "react";
import { useApi } from "../hooks/useApi";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { apiFetch } = useApi(); // ✅ SAFE hook usage
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- LOAD TODOS ----------------
  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/todos");
      setTodos(data);
    } catch (err) {
      console.error("Failed to load todos", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ADD TODO ----------------
  const addTodo = async (title) => {
    const todo = await apiFetch("/todos", {
      method: "POST",
      body: JSON.stringify({
        title,
        status: "todo",
      }),
    });

    setTodos((prev) => [...prev, todo]);
  };

  // ---------------- TOGGLE TODO ----------------
  const toggleTodo = async (todo) => {
    const newStatus = todo.status === "done" ? "todo" : "done";

    // optimistic update
    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, status: newStatus } : t
      )
    );

    try {
      await apiFetch(`/todos/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      // rollback on failure
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? todo : t))
      );
    }
  };

  // ---------------- DELETE TODO ----------------
  const deleteTodo = async (id) => {
    const prev = todos;

    setTodos((t) => t.filter((x) => x._id !== id));

    try {
      await apiFetch(`/todos/${id}`, { method: "DELETE" });
    } catch (err) {
      setTodos(prev);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        loadTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
