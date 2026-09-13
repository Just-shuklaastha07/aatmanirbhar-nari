const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const getPendingBusinesses = async () => {
  const response = await fetch(
    `${API_URL}/admin/businesses/pending`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
};

export const getBusinessById = async (businessId) => {
  const response = await fetch(
    `${API_URL}/admin/businesses/${businessId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
};

export const updateBusinessStatus = async (
  businessId,
  status,
  rejectionReason = ""
) => {
  const response = await fetch(
    `${API_URL}/admin/businesses/${businessId}/status`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        status,
        rejectionReason,
      }),
    }
  );

  return handleResponse(response);
};