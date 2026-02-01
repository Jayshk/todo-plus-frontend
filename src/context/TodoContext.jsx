import { createContext, useContext, useEffect, useState } from "react";
import { fetchTodos } from "../services/todos";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos, loading }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
