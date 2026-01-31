import { apiFetch } from '../services/api';

// get all tasks
export function getTasks() {
  return apiFetch('/tasks');
}

// create new task
export function createTask(title, description) {
  return apiFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
}

// update task
export function updateTask(id, data) {
  return apiFetch(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// delete task
export function deleteTask(id) {
  return apiFetch(`/tasks/${id}`, {
    method: 'DELETE',
  });
}
