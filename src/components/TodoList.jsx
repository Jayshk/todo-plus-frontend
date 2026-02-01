import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import TodoFilters from "./TodoFilters";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo, updateTodo, loading } = useTodos();
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");


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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.status === "done";
    if (filter === "todo") return todo.status === "todo";
    return true;
  });

  return (
    <div className="space-y-4">
      <AddTodo />
      <TodoFilters filter={filter} setFilter={setFilter} />

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.status === "done"}
                    onChange={() => toggleTodo(todo)}
                  />

                  <span
                    className={`cursor-pointer ${
                      todo.status === "done" ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>


                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(todo._id)}
                    disabled={todo.status === "done"}
                    className={`text-blue-500 ${
                      todo.status === "done" ? "opacity-40 cursor-not-allowed" : ""
                    }`}
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
