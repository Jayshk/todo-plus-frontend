import { apiFetch } from "./api";

export const fetchTodos = () => {
  return apiFetch("/todos");
};

export const addTodo = (data) => {
  return apiFetch("/todos", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const toggleTodo = (id, completed) => {
  return apiFetch(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
  });
};

export const deleteTodo = (id) => {
  return apiFetch(`/todos/${id}`, {
    method: "DELETE",
  });
};
