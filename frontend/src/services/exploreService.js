const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getApprovedBusinesses = async (filters = {}) => {
  const parameters = new URLSearchParams();

  if (filters.search?.trim()) {
    parameters.set("search", filters.search.trim());
  }

  if (filters.category) {
    parameters.set("category", filters.category);
  }

  if (filters.city?.trim()) {
    parameters.set("city", filters.city.trim());
  }

  const queryString = parameters.toString();

  const response = await fetch(
    `${API_URL}/businesses${queryString ? `?${queryString}` : ""}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load businesses.");
  }

  return data;
};