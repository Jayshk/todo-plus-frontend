import { useAuth } from "../context/AuthContext";
import {apiFetch as apiFetchCore} from "../services/api";

export const useApi = () => {
  const { token, refreshAccessToken, logout } = useAuth();

  const apiFetch = (path, options = {}) => {
    return apiFetchCore(path, options, token, refreshAccessToken, logout);
  };

  return { apiFetch };
};
