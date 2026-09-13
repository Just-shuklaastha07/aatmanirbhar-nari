const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = () => {
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

export const sendInquiry = async ({
  businessId,
  subject,
  message,
}) => {
  const response = await fetch(`${API_URL}/inquiries`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      businessId,
      subject,
      message,
    }),
  });

  return handleResponse(response);
};

export const getSentInquiries = async () => {
  const response = await fetch(`${API_URL}/inquiries/sent`, {
    headers: getHeaders(),
  });

  return handleResponse(response);
};

export const getReceivedInquiries = async () => {
  const response = await fetch(`${API_URL}/inquiries/received`, {
    headers: getHeaders(),
  });

  return handleResponse(response);
};

export const updateInquiryStatus = async (inquiryId, status) => {
  const response = await fetch(
    `${API_URL}/inquiries/${inquiryId}/status`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  return handleResponse(response);
};

export const respondToInquiry = async (inquiryId, responseMessage) => {
  const response = await fetch(
    `${API_URL}/inquiries/${inquiryId}/respond`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        response: responseMessage,
      }),
    }
  );

  return handleResponse(response);
};