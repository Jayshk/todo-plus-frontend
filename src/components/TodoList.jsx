import { updateTodo, deleteTodo } from "../services/todos";
import AddTodo from "./AddTodo";

export default function TodoList({ todos, setTodos }) {
  const toggleStatus = async (todo) => {
    const updated = await updateTodo(
      todo._id,
      todo.status === "done" ? "todo" : "done"
    );

    setTodos(prev =>
      prev.map(t => (t._id === updated._id ? updated : t))
    );
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="space-y-4">
      <AddTodo onTodoAdded={t => setTodos(prev => [...prev, t])} />

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo._id} className="flex justify-between border p-2 rounded">
            <span
              onClick={() => toggleStatus(todo)}
              className={`cursor-pointer ${
                todo.status === "done" ? "line-through text-gray-400" : ""
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
