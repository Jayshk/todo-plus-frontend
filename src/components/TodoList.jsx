import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo, updateTodo } from "../services/api";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      setTodos(
        todos.map(t => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
      );
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <AddTodo onTodoAdded={(newTodo) => setTodos([...todos, newTodo])} />
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
            onClick={() => toggleComplete(todo)}
          >
            {todo.title}
          </span>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
    </>
  );
};

export default TodoList;
