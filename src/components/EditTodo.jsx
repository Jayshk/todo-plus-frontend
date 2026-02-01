import { useState } from "react";

export default function EditTodo({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");


  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = async (id) => {
    await api.put(`/todos/${id}`, { title: editText });
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: editText } : t
      )
    );
    setEditingId(null);
  };

  return (
    <div className="flex gap-2">
      {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              {editingId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-2 py-1 flex-1 mr-2"
                />
              ) : (
                <span
                  className={todo.completed ? "line-through" : ""}
                >
                  {todo.title}
                </span>
              )}

              <div className="flex gap-2">
                {editingId === todo.id ? (
                  <button onClick={() => saveEdit(todo.id)}>💾</button>
                ) : (
                  <button onClick={() => startEdit(todo)}>✏️</button>
                )}
              </div>
            </div>
          ))}
    </div>
  );
}
