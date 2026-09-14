import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendInquiry } from "../services/inquiryService";
import { useLanguage } from "../context/LanguageContext";
import "./InquiryForm.css";

export default function InquiryForm({
  businessId,
  businessName,
  onClose,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
      setError(t("inquiry.customerOnly"));
      return;
    }

    if (formData.subject.trim().length < 3) {
      setError(t("inquiry.invalidSubject"));
      return;
    }

    if (formData.message.trim().length < 10) {
      setError(t("inquiry.invalidMessage"));
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

      setSuccessMessage(t("inquiry.success"));

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
          aria-label={t("inquiry.close")}
          onClick={onClose}
        >
          ×
        </button>

        <p className="inquiry-label">
          {t("inquiry.label")}
        </p>

        <h2 id="inquiry-title">
          {t("inquiry.contact")} {businessName}
        </h2>

        {error && (
          <div className="inquiry-error">{error}</div>
        )}

        {successMessage && (
          <div className="inquiry-success">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="inquiry-subject">
            {t("inquiry.subject")}
          </label>

          <input
            id="inquiry-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t("inquiry.subjectPlaceholder")}
            maxLength="120"
            required
          />

          <label htmlFor="inquiry-message">
            {t("inquiry.message")}
          </label>

          <textarea
            id="inquiry-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("inquiry.messagePlaceholder")}
            rows="6"
            maxLength="1000"
            required
          />

          <button
            type="submit"
            className="send-inquiry-button"
            disabled={submitting}
          >
            {submitting
              ? t("inquiry.sending")
              : t("inquiry.send")}
          </button>
        </form>
      </section>
    </div>
  );
}