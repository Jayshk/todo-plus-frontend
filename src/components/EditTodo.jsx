import { useState } from "react";

export default function EditTodo({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);

  return (
    <div className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1"
      />
      <button onClick={() => onSave(title)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
