import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendInquiry } from "../services/inquiryService";
import "./InquiryForm.css";

export default function InquiryForm({
  businessId,
  businessName,
  onClose,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    if (user.role !== "customer") {
      setError("Only customer accounts can send inquiries.");
      return;
    }

    if (formData.subject.trim().length < 3) {
      setError("Subject must contain at least 3 characters.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setError("Message must contain at least 10 characters.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccessMessage("");

      await sendInquiry({
        businessId,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSuccessMessage("Your inquiry was sent successfully.");
      setFormData({
        subject: "",
        message: "",
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="inquiry-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="inquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        <button
          type="button"
          className="inquiry-close"
          aria-label="Close inquiry form"
          onClick={onClose}
        >
          ×
        </button>

        <p className="inquiry-label">CUSTOMER INQUIRY</p>
        <h2 id="inquiry-title">Contact {businessName}</h2>

        {error && <div className="inquiry-error">{error}</div>}

        {successMessage && (
          <div className="inquiry-success">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="inquiry-subject">Subject</label>
          <input
            id="inquiry-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="For example: Custom order request"
            maxLength="120"
            required
          />

          <label htmlFor="inquiry-message">Message</label>
          <textarea
            id="inquiry-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe the product or service you need"
            rows="6"
            maxLength="1000"
            required
          />

          <button
            type="submit"
            className="send-inquiry-button"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </section>
    </div>
  );
}