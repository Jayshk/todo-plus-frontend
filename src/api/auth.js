import { apiFetch } from '../services/api';

export function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getMe() {
  return apiFetch('/auth/me');
}
