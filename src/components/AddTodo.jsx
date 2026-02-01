import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1"
        placeholder="New todo"
      />
      <button className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
