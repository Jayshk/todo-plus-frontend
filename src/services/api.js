const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL


export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token'); // if your backend uses auth

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API Error');
  }

  return res.json();
}

// Todo-related API functions
export async function getTodos() {
  return apiFetch('/todos');
}

export async function createTodo(data) {
  return apiFetch('/todos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTodo(id, data) {
  return apiFetch(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTodo(id) {
  return apiFetch(`/todos/${id}`, {
    method: 'DELETE',
  });
}

// Auth-related API functions
export async function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
