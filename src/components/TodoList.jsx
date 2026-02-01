import { useTodos } from "../context/TodoContext";
import AddTodo from "./AddTodo";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo, addTodo } = useTodos();

  return (
    <div className="space-y-4">
      <AddTodo onAdd={addTodo} />

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between border p-2 rounded">
            <span
              onClick={() => toggleTodo(todo)}
              className={`cursor-pointer ${
                todo.status === "done"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {todo.title}
            </span>

            <button
              onClick={() => deleteTodo(todo._id)}
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
