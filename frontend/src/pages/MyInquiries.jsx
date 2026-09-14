import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { getSentInquiries } from "../services/inquiryService";
import "./MyInquiries.css";

const translations = {
  EN: {
    label: "MY REQUESTS",
    title: "My Inquiries",
    subtitle:
      "View your messages and responses from entrepreneurs.",
    loading: "Loading inquiries...",
    emptyTitle: "No inquiries found",
    emptyMessage: "You have not sent any inquiries yet.",
    subject: "Subject",
    message: "Message",
    sentOn: "Sent on",
    response: "Entrepreneur’s response",
    respondedOn: "Responded on",
    waiting: "Waiting for the entrepreneur’s response.",
    unknownBusiness: "Business",
    localBusiness: "Local business",

    statuses: {
      new: "New",
      read: "Read",
      responded: "Responded",
      closed: "Closed",
    },
  },

  HI: {
    label: "मेरे अनुरोध",
    title: "मेरी पूछताछ",
    subtitle:
      "अपने संदेश और उद्यमियों से मिले उत्तर देखें।",
    loading: "पूछताछ लोड हो रही हैं...",
    emptyTitle: "कोई पूछताछ नहीं मिली",
    emptyMessage: "आपने अभी तक कोई पूछताछ नहीं भेजी है।",
    subject: "विषय",
    message: "संदेश",
    sentOn: "भेजने की तारीख",
    response: "उद्यमी का उत्तर",
    respondedOn: "उत्तर देने की तारीख",
    waiting: "उद्यमी के उत्तर की प्रतीक्षा है।",
    unknownBusiness: "व्यवसाय",
    localBusiness: "स्थानीय व्यवसाय",

    statuses: {
      new: "नया",
      read: "पढ़ा गया",
      responded: "उत्तर दिया गया",
      closed: "बंद",
    },
  },
};

export default function MyInquiries() {
  const { language } = useLanguage();

  const text = translations[language] || translations.EN;

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSentInquiries();

      setInquiries(data.inquiries || []);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to load your inquiries."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

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

  const getBusinessName = (inquiry) => {
    return (
      inquiry.business?.businessName ||
      text.unknownBusiness
    );
  };

  const getBusinessDetails = (inquiry) => {
    const category = inquiry.business?.category || "";
    const city = inquiry.business?.city || "";

    if (category && city) {
      return `${category} • ${city}`;
    }

    return category || city || text.localBusiness;
  };

  return (
    <>
      <Navbar />

      <main className="my-inquiries-page">
        <section className="my-inquiries-heading">
          <p>{text.label}</p>
          <h1>{text.title}</h1>
          <span>{text.subtitle}</span>
        </section>

        {error && (
          <div className="inquiries-error" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <p className="inquiries-status">
            {text.loading}
          </p>
        ) : inquiries.length === 0 ? (
          <section className="inquiries-empty">
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyMessage}</p>
          </section>
        ) : (
          <section className="inquiries-list">
            {inquiries.map((inquiry) => (
              <article
                className="customer-inquiry-card"
                key={inquiry._id}
              >
                <div className="inquiry-card-header">
                  <div>
                    <h2>{getBusinessName(inquiry)}</h2>

                    <p className="inquiry-business-details">
                      {getBusinessDetails(inquiry)}
                    </p>
                  </div>

                  <span
                    className={`inquiry-status ${inquiry.status}`}
                  >
                    {getStatusText(inquiry.status)}
                  </span>
                </div>

                <div className="customer-message">
                  <h3>
                    {text.subject}: {inquiry.subject}
                  </h3>

                  <p>
                    {text.message}: {inquiry.message}
                  </p>

                  <small>
                    {text.sentOn}{" "}
                    {formatDate(inquiry.createdAt)}
                  </small>
                </div>

                {inquiry.response ? (
                  <div className="entrepreneur-response">
                    <h3>{text.response}</h3>

                    <p>{inquiry.response}</p>

                    {inquiry.respondedAt && (
                      <small>
                        {text.respondedOn}{" "}
                        {formatDate(inquiry.respondedAt)}
                      </small>
                    )}
                  </div>
                ) : (
                  <div className="waiting-response">
                    {text.waiting}
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}