import { useState } from "react";
import { updateTodo, deleteTodo } from "../services/todos";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import { useTodos } from "../context/TodoContext";

export default function TodoList({ todos, setTodos }) {
  const toggleStatus = async (todo) => {
    const newStatus = todo.status === "done" ? "todo" : "done";

    // optimistic update
    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, status: newStatus } : t
      )
    );

    try {
      await updateTodo(todo._id, newStatus);
    } catch (err) {
      console.error("Update failed, rolling back");

      // rollback
      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, status: todo.status } : t
        )
      );
    }
  };


  const removeTodo = async (id) => {
    const previous = todos;

    // optimistic remove
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Delete failed, restoring todo");
      setTodos(previous);
    }
  };

  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter(t =>
    filter === "all" ? true : t.status === filter
  );

  const { todos, updateTodo, deleteTodo } = useTodos();
  return (
   
    <div className="space-y-4">
      <AddTodo onTodoAdded={(t) => setTodos((prev) => [...prev, t])} />

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="flex justify-between border p-2 rounded">
            <span
              onClick={() => toggleStatus(todo)}
              className={`cursor-pointer ${
                todo.status === "done"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {todo.title}
            </span>
        
           
            <button
              onClick={() => removeTodo(todo._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
