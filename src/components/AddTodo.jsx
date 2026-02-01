import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      await addTodo(trimmed); // Uses context's addTodo (API + optimistic update)
      setTitle(""); // clear input on success
    } catch (err) {
      console.error("Failed to add todo:", err);
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
}
