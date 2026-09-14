import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getReceivedInquiries,
  respondToInquiry,
  updateInquiryStatus,
} from "../services/inquiryService";
import "./BusinessInquiries.css";

export default function BusinessInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReceivedInquiries();
      setInquiries(data.inquiries || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

  const replaceInquiry = (updatedInquiry) => {
    setInquiries((currentInquiries) =>
      currentInquiries.map((inquiry) =>
        inquiry._id === updatedInquiry._id
          ? updatedInquiry
          : inquiry
      )
    );
  };

  const handleResponseChange = (inquiryId, value) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [inquiryId]: value,
    }));
  };

  const markAsRead = async (inquiryId) => {
    try {
      setProcessingId(inquiryId);
      setError("");
      setMessage("");

      const data = await updateInquiryStatus(inquiryId, "read");
      replaceInquiry(data.inquiry);

      setMessage("Inquiry marked as read.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
    }
  };

  const closeInquiry = async (inquiryId) => {
    try {
      setProcessingId(inquiryId);
      setError("");
      setMessage("");

      const data = await updateInquiryStatus(inquiryId, "closed");
      replaceInquiry(data.inquiry);

      setMessage("Inquiry closed successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
    }
  };

  const sendResponse = async (inquiryId) => {
    const responseText = responses[inquiryId]?.trim();

    if (!responseText) {
      setError("Enter a response before sending.");
      return;
    }

    try {
      setProcessingId(inquiryId);
      setError("");
      setMessage("");

      const data = await respondToInquiry(
        inquiryId,
        responseText
      );

      replaceInquiry(data.inquiry);

      setResponses((currentResponses) => ({
        ...currentResponses,
        [inquiryId]: "",
      }));

      setMessage("Response sent successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="business-inquiries-page">
        <header className="business-inquiries-header">
          <p>CUSTOMER MESSAGES</p>
          <h1>Business Inquiries</h1>
          <span>
            Read and respond to customers interested in your
            services.
          </span>
        </header>

        {message && (
          <div className="business-inquiry-message success">
            {message}
          </div>
        )}

        {error && (
          <div className="business-inquiry-message error">
            {error}
          </div>
        )}

        {loading ? (
          <p className="business-inquiries-state">
            Loading inquiries...
          </p>
        ) : inquiries.length === 0 ? (
          <section className="business-inquiries-empty">
            <h2>No inquiries received</h2>
            <p>
              Customer messages will appear here when they contact
              your business.
            </p>
          </section>
        ) : (
          <section className="received-inquiries-list">
            {inquiries.map((inquiry) => (
              <article
                className="received-inquiry-card"
                key={inquiry._id}
              >
                <div className="received-inquiry-heading">
                  <div>
                    <h2>{inquiry.subject}</h2>

                    <p>
                      For{" "}
                      {inquiry.business?.businessName ||
                        "your business"}
                    </p>
                  </div>

                  <span
                    className={`received-status status-${inquiry.status}`}
                  >
                    {inquiry.status}
                  </span>
                </div>

                <div className="customer-details">
                  <div>
                    <span>Customer</span>
                    <strong>
                      {inquiry.customer?.fullName ||
                        "Customer unavailable"}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>
                      {inquiry.customer?.email || "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>Mobile</span>
                    <strong>
                      {inquiry.customer?.mobile || "Not available"}
                    </strong>
                  </div>
                </div>

                <div className="customer-message">
                  <h3>Customer’s message</h3>
                  <p>{inquiry.message}</p>

                  <small>
                    Received on{" "}
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </small>
                </div>

                {inquiry.response && (
                  <div className="existing-response">
                    <h3>Your response</h3>
                    <p>{inquiry.response}</p>
                  </div>
                )}

                {inquiry.status !== "closed" && (
                  <div className="response-form">
                    <label htmlFor={`response-${inquiry._id}`}>
                      {inquiry.response
                        ? "Send another response"
                        : "Write a response"}
                    </label>

                    <textarea
                      id={`response-${inquiry._id}`}
                      value={responses[inquiry._id] || ""}
                      onChange={(event) =>
                        handleResponseChange(
                          inquiry._id,
                          event.target.value
                        )
                      }
                      placeholder="Write your response to the customer"
                      rows="4"
                      maxLength="1000"
                    />

                    <button
                      type="button"
                      className="respond-button"
                      disabled={processingId === inquiry._id}
                      onClick={() => sendResponse(inquiry._id)}
                    >
                      Send Response
                    </button>
                  </div>
                )}

                <div className="inquiry-management-actions">
                  {inquiry.status === "new" && (
                    <button
                      type="button"
                      className="read-button"
                      disabled={processingId === inquiry._id}
                      onClick={() => markAsRead(inquiry._id)}
                    >
                      Mark as Read
                    </button>
                  )}

                  {inquiry.status !== "closed" && (
                    <button
                      type="button"
                      className="close-inquiry-button"
                      disabled={processingId === inquiry._id}
                      onClick={() => closeInquiry(inquiry._id)}
                    >
                      Close Inquiry
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}