import { useState } from "react";

export default function EditTodo({ todo, onSave, onCancel }) {
  const [text, setText] = useState(todo.title);

  return (
    <div className="flex gap-2 w-full">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border px-2 py-1 flex-1 rounded"
      />
      <button onClick={() => onSave(todo._id, text)}>💾</button>
      <button onClick={onCancel}>❌</button>
    </div>
  );
}
