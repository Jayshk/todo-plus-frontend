const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiFetch(path, options = {}, token, refreshAccessToken, logout) {
  const makeRequest = async (accessToken) => {
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

    if (res.status === 401) throw new Error("Unauthorized");
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "API Error");
    }

    return res.json();
  };

  try {
    return await makeRequest(token);
  } catch (err) {
    if (err.message === "Unauthorized") {
      try {
        const newToken = await refreshAccessToken();
        return await makeRequest(newToken);
      } catch (refreshErr) {
        logout();
        throw refreshErr;
      }
    }
    throw err;
  }
}
