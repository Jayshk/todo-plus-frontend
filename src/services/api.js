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