import { apiFetch } from '../services/api';

export function getTodos(token) {
  return apiFetch('/todos', { method: 'GET' }, token);
}

export function createTodo(data, token) {
  return apiFetch(
    '/todos',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token
  );
}
