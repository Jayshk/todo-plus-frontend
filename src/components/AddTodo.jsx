import React, { useState } from "react";
import { apiFetch } from "../services/api";

const AddTodo = ({ onTodoAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTodo = await apiFetch("/todos", {
        method: "POST",
        body: JSON.stringify({ title, completed: false }),
      });

      onTodoAdded(newTodo); // update parent list
      setTitle(""); // clear input
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
