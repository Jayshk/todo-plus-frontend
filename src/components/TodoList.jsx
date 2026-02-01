import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo, updateTodo, loading } = useTodos();
  const [editingId, setEditingId] = useState(null);

  const handleSave = (id, newTitle) => {
    updateTodo(id, newTitle);
    setEditingId(null);
  };

  if (loading) return <p className="text-center text-gray-500">Loading todos...</p>;

  if (todos.length === 0)
    return (
      <div className="text-center text-gray-500 space-y-4">
        <p>No todos yet. Add your first todo!</p>
        <AddTodo />
      </div>
    );

  return (
    <div className="space-y-4">
      <AddTodo />

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {editingId === todo._id ? (
              <EditTodo
                todo={todo}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(todo)}
                  className={`cursor-pointer ${
                    todo.status === "done" ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(todo._id)}
                    className="text-blue-500"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
