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

export const updateTodo = (id, status) => {
  return apiFetch(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const deleteTodo = (id) => {
  return apiFetch(`/todos/${id}`, {
    method: "DELETE",
  });
};

export const updateTodoTitle = (id, title) =>
  apiFetch(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
