const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const sendRequest = async (endpoint, token, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return data;
};

export const getMyBusinessProfile = async (token) => {
  return sendRequest("/businesses/profile/me", token);
};

export const createBusinessProfile = async (profile, token) => {
  return sendRequest("/businesses/profile", token, {
    method: "POST",
    body: JSON.stringify(profile),
  });
};

export const updateBusinessProfile = async (profile, token) => {
  return sendRequest("/businesses/profile/me", token, {
    method: "PUT",
    body: JSON.stringify(profile),
  });
};

export const submitBusinessProfile = async (token) => {
  return sendRequest("/businesses/profile/submit", token, {
    method: "POST",
  });
};