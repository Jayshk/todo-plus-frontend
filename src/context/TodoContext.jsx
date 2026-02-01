import { createContext, useContext, useState } from "react";
import * as todoApi from "../services/todos";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    const todo = await todoApi.addTodo({
      title,
      status: "todo",
    });
    setTodos((prev) => [...prev, todo]);
  };

  const toggleTodo = async (todo) => {
    const newStatus = todo.status === "done" ? "todo" : "done";

    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, status: newStatus } : t
      )
    );

    try {
      await todoApi.updateTodo(todo._id, newStatus);
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? todo : t))
      );
    }
  };

  const deleteTodo = async (id) => {
    const prev = todos;
    setTodos((t) => t.filter((x) => x._id !== id));

    try {
      await todoApi.deleteTodo(id);
    } catch {
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
