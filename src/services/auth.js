import { useApi } from "../hooks/useApi";

export const useAuthApi = () => {
  const { apiFetch } = useApi();

  const login = (email, password) => apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const register = (email, password) => apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return { login, register };
};
