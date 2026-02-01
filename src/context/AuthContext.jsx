import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [user, setUser] = useState(null);

  // Decode JWT on token change
  useEffect(() => {
    if (!token) return setUser(null);

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(decoded);
      }
    } catch {
      logout();
    }
  }, [token]);

  // Login function
  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setToken(accessToken);
    setRefreshToken(refreshToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  // Refresh access token
  const refreshAccessToken = async () => {
    if (!refreshToken) throw new Error("No refresh token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!res.ok) throw new Error("Refresh failed");

      const data = await res.json();

      localStorage.setItem("accessToken", data.accessToken);
      setToken(data.accessToken);

      return data.accessToken;
    } catch (err) {
      logout();
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, refreshToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
