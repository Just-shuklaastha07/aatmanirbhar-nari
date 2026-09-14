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

// Customer sends an inquiry
export const sendInquiry = async ({
  businessId,
  subject,
  message,
}) => {
  const response = await fetch(`${API_URL}/inquiries`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      businessId,
      subject,
      message,
    }),
  });

  return handleResponse(response);
};

// Customer views sent inquiries
export const getSentInquiries = async () => {
  const response = await fetch(`${API_URL}/inquiries/sent`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

// Entrepreneur views received inquiries
export const getReceivedInquiries = async () => {
  const response = await fetch(`${API_URL}/inquiries/received`, {
    method: "GET",
   headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

// Entrepreneur marks an inquiry as read or closed
export const updateInquiryStatus = async (
  inquiryId,
  status
) => {
  const response = await fetch(
    `${API_URL}/inquiries/${inquiryId}/status`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  return handleResponse(response);
};

// Entrepreneur sends a response
export const respondToInquiry = async (
  inquiryId,
  responseMessage
) => {
  const response = await fetch(
    `${API_URL}/inquiries/${inquiryId}/respond`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        response: responseMessage,
      }),
    }
  );

  return handleResponse(response);
};