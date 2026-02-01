import { useState } from "react";

export default function EditTodo({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave(todo._id, trimmed);
  };

  return (
    <div className="flex gap-2 items-center flex-1">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border px-2 py-1 rounded"
      />
      <button
        onClick={handleSave}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        💾
      </button>
      <button
        onClick={onCancel}
        className="px-2 py-1 bg-gray-300 rounded"
      >
        ❌
      </button>
    </div>
  );
}
