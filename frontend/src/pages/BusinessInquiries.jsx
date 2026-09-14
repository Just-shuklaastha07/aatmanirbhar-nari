import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

import {
  getReceivedInquiries,
  respondToInquiry,
  updateInquiryStatus,
} from "../services/inquiryService";

import "./BusinessInquiries.css";

const translations = {
  EN: {
    label: "CUSTOMER MESSAGES",
    title: "Business Inquiries",
    subtitle:
      "Read and respond to customers interested in your services.",

    loading: "Loading inquiries...",
    emptyTitle: "No inquiries received",
    emptyMessage:
      "Customer messages will appear here when they contact your business.",

    forBusiness: "For",
    yourBusiness: "your business",
    customer: "Customer",
    customerUnavailable: "Customer unavailable",
    email: "Email",
    mobile: "Mobile",
    notAvailable: "Not available",

    customerMessage: "Customer’s message",
    receivedOn: "Received on",
    yourResponse: "Your response",
    sendAnotherResponse: "Send another response",
    writeResponse: "Write a response",
    responsePlaceholder: "Write your response to the customer",

    sendResponse: "Send Response",
    sending: "Sending...",
    markRead: "Mark as Read",
    closing: "Closing...",
    closeInquiry: "Close Inquiry",

    readSuccess: "Inquiry marked as read.",
    closeSuccess: "Inquiry closed successfully.",
    responseSuccess: "Response sent successfully.",
    responseRequired: "Enter a response before sending.",

    statuses: {
      new: "New",
      read: "Read",
      responded: "Responded",
      closed: "Closed",
    },
  },

  HI: {
    label: "ग्राहक संदेश",
    title: "व्यवसाय पूछताछ",
    subtitle:
      "आपकी सेवाओं में रुचि रखने वाले ग्राहकों के संदेश पढ़ें और उनका उत्तर दें।",

    loading: "पूछताछ लोड हो रही हैं...",
    emptyTitle: "कोई पूछताछ प्राप्त नहीं हुई",
    emptyMessage:
      "जब कोई ग्राहक आपके व्यवसाय से संपर्क करेगा, तो उसका संदेश यहां दिखाई देगा।",

    forBusiness: "व्यवसाय",
    yourBusiness: "आपका व्यवसाय",
    customer: "ग्राहक",
    customerUnavailable: "ग्राहक की जानकारी उपलब्ध नहीं है",
    email: "ईमेल",
    mobile: "मोबाइल",
    notAvailable: "उपलब्ध नहीं",

    customerMessage: "ग्राहक का संदेश",
    receivedOn: "प्राप्ति की तारीख",
    yourResponse: "आपका उत्तर",
    sendAnotherResponse: "दूसरा उत्तर भेजें",
    writeResponse: "उत्तर लिखें",
    responsePlaceholder: "ग्राहक के लिए अपना उत्तर लिखें",

    sendResponse: "उत्तर भेजें",
    sending: "भेजा जा रहा है...",
    markRead: "पढ़ा हुआ चिह्नित करें",
    closing: "बंद किया जा रहा है...",
    closeInquiry: "पूछताछ बंद करें",

    readSuccess: "पूछताछ को पढ़ा हुआ चिह्नित किया गया।",
    closeSuccess: "पूछताछ सफलतापूर्वक बंद कर दी गई।",
    responseSuccess: "उत्तर सफलतापूर्वक भेजा गया।",
    responseRequired: "उत्तर भेजने से पहले अपना उत्तर लिखें।",

    statuses: {
      new: "नया",
      read: "पढ़ा गया",
      responded: "उत्तर दिया गया",
      closed: "बंद",
    },
  },
};

export default function BusinessInquiries() {
  const { language } = useLanguage();

  const text = translations[language] || translations.EN;

  const [inquiries, setInquiries] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [processingAction, setProcessingAction] =
    useState("");
  const [error, setError] = useState("");
  const [messageKey, setMessageKey] = useState("");

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

    setError("");
    setMessageKey("");
  };

  const markAsRead = async (inquiryId) => {
    try {
      setProcessingId(inquiryId);
      setProcessingAction("read");
      setError("");
      setMessageKey("");

      const data = await updateInquiryStatus(
        inquiryId,
        "read"
      );

      replaceInquiry(data.inquiry);
      setMessageKey("read");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
      setProcessingAction("");
    }
  };

  const closeInquiry = async (inquiryId) => {
    try {
      setProcessingId(inquiryId);
      setProcessingAction("close");
      setError("");
      setMessageKey("");

      const data = await updateInquiryStatus(
        inquiryId,
        "closed"
      );

      replaceInquiry(data.inquiry);
      setMessageKey("closed");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
      setProcessingAction("");
    }
  };

  const sendResponse = async (inquiryId) => {
    const responseText = responses[inquiryId]?.trim();

    if (!responseText) {
      setError(text.responseRequired);
      return;
    }

    try {
      setProcessingId(inquiryId);
      setProcessingAction("respond");
      setError("");
      setMessageKey("");

      const data = await respondToInquiry(
        inquiryId,
        responseText
      );

      replaceInquiry(data.inquiry);

      setResponses((currentResponses) => ({
        ...currentResponses,
        [inquiryId]: "",
      }));

      setMessageKey("responded");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
      setProcessingAction("");
    }
  };

  const getSuccessMessage = () => {
    if (messageKey === "read") {
      return text.readSuccess;
    }

    if (messageKey === "closed") {
      return text.closeSuccess;
    }

    if (messageKey === "responded") {
      return text.responseSuccess;
    }

    return "";
  };

  const getStatusText = (status) => {
    return text.statuses[status] || status;
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString(
      language === "HI" ? "hi-IN" : "en-IN",
      {
        dateStyle: "short",
        timeStyle: "medium",
      }
    );
  };

  return (
    <>
      <Navbar />

      <main className="business-inquiries-page">
        <header className="business-inquiries-header">
          <p>{text.label}</p>

          <h1>{text.title}</h1>

          <span>{text.subtitle}</span>
        </header>

        {messageKey && (
          <div
            className="business-inquiry-message success"
            role="status"
          >
            {getSuccessMessage()}
          </div>
        )}

        {error && (
          <div
            className="business-inquiry-message error"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading ? (
          <p className="business-inquiries-state">
            {text.loading}
          </p>
        ) : inquiries.length === 0 ? (
          <section className="business-inquiries-empty">
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyMessage}</p>
          </section>
        ) : (
          <section className="received-inquiries-list">
            {inquiries.map((inquiry) => {
              const isProcessing =
                processingId === inquiry._id;

              return (
                <article
                  className="received-inquiry-card"
                  key={inquiry._id}
                >
                  <div className="received-inquiry-heading">
                    <div>
                      <h2>{inquiry.subject}</h2>

                      <p>
                        {text.forBusiness}:{" "}
                        {inquiry.business?.businessName ||
                          text.yourBusiness}
                      </p>
                    </div>

                    <span
                      className={`received-status status-${inquiry.status}`}
                    >
                      {getStatusText(inquiry.status)}
                    </span>
                  </div>

                  <div className="customer-details">
                    <div>
                      <span>{text.customer}</span>

                      <strong>
                        {inquiry.customer?.fullName ||
                          text.customerUnavailable}
                      </strong>
                    </div>

                    <div>
                      <span>{text.email}</span>

                      <strong>
                        {inquiry.customer?.email ||
                          text.notAvailable}
                      </strong>
                    </div>

                    <div>
                      <span>{text.mobile}</span>

                      <strong>
                        {inquiry.customer?.mobile ||
                          text.notAvailable}
                      </strong>
                    </div>
                  </div>

                  <div className="customer-message">
                    <h3>{text.customerMessage}</h3>

                    <p>{inquiry.message}</p>

                    <small>
                      {text.receivedOn}{" "}
                      {formatDate(inquiry.createdAt)}
                    </small>
                  </div>

                  {inquiry.response && (
                    <div className="existing-response">
                      <h3>{text.yourResponse}</h3>
                      <p>{inquiry.response}</p>

                      {inquiry.respondedAt && (
                        <small>
                          {formatDate(inquiry.respondedAt)}
                        </small>
                      )}
                    </div>
                  )}

                  {inquiry.status !== "closed" && (
                    <div className="response-form">
                      <label
                        htmlFor={`response-${inquiry._id}`}
                      >
                        {inquiry.response
                          ? text.sendAnotherResponse
                          : text.writeResponse}
                      </label>

                      <textarea
                        id={`response-${inquiry._id}`}
                        value={
                          responses[inquiry._id] || ""
                        }
                        onChange={(event) =>
                          handleResponseChange(
                            inquiry._id,
                            event.target.value
                          )
                        }
                        placeholder={
                          text.responsePlaceholder
                        }
                        rows="4"
                        maxLength="1000"
                      />

                      <button
                        type="button"
                        className="respond-button"
                        disabled={isProcessing}
                        onClick={() =>
                          sendResponse(inquiry._id)
                        }
                      >
                        {isProcessing &&
                        processingAction === "respond"
                          ? text.sending
                          : text.sendResponse}
                      </button>
                    </div>
                  )}

                  <div className="inquiry-management-actions">
                    {inquiry.status === "new" && (
                      <button
                        type="button"
                        className="read-button"
                        disabled={isProcessing}
                        onClick={() =>
                          markAsRead(inquiry._id)
                        }
                      >
                        {text.markRead}
                      </button>
                    )}

                    {inquiry.status !== "closed" && (
                      <button
                        type="button"
                        className="close-inquiry-button"
                        disabled={isProcessing}
                        onClick={() =>
                          closeInquiry(inquiry._id)
                        }
                      >
                        {isProcessing &&
                        processingAction === "close"
                          ? text.closing
                          : text.closeInquiry}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}