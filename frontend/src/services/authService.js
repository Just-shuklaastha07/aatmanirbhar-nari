const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const registerUser = async (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (loginData) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};

export const getCurrentUser = async (token) => {
  return request("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};