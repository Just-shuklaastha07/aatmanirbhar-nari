import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLanguage } from "../../context/LanguageContext";


import {
  getPendingBusinesses,
  updateBusinessStatus,
} from "../../services/adminService";

import "./AdminDashboard.css";

const translations = {
  EN: {
    label: "ADMIN PANEL",
    title: "Business Approval Dashboard",
    subtitle:
      "Review submitted businesses before publishing them.",

    loading: "Loading pending businesses...",
    emptyTitle: "No pending profiles",
    emptyMessage:
      "All submitted business profiles have been reviewed.",
    refresh: "Refresh",

    pending: "Pending",
    complete: "complete",
    entrepreneur: "Entrepreneur",
    email: "Email",
    location: "Location",
    experience: "Experience",
    years: "years",
    priceRange: "Price range",
    submitted: "Submitted",
    services: "Services",
    noServices: "No services provided.",
    notAvailable: "Not available",

    reject: "Reject",
    approve: "Approve",
    processing: "Processing...",

    rejectionPrompt:
      "Enter the reason for rejecting this business profile:",
    rejectionRequired: "A rejection reason is required.",
    approvedMessage:
      "Business profile approved successfully.",
    rejectedMessage:
      "Business profile rejected successfully.",
  },

  HI: {
    label: "एडमिन पैनल",
    title: "व्यवसाय स्वीकृति डैशबोर्ड",
    subtitle:
      "व्यवसायों को प्रकाशित करने से पहले उनकी जानकारी की समीक्षा करें।",

    loading: "लंबित व्यवसाय लोड हो रहे हैं...",
    emptyTitle: "कोई लंबित प्रोफ़ाइल नहीं है",
    emptyMessage:
      "सभी जमा की गई व्यवसाय प्रोफ़ाइल की समीक्षा पूरी हो चुकी है।",
    refresh: "दोबारा लोड करें",

    pending: "लंबित",
    complete: "पूर्ण",
    entrepreneur: "उद्यमी",
    email: "ईमेल",
    location: "स्थान",
    experience: "अनुभव",
    years: "वर्ष",
    priceRange: "मूल्य सीमा",
    submitted: "जमा करने की तारीख",
    services: "सेवाएं",
    noServices: "कोई सेवा प्रदान नहीं की गई है।",
    notAvailable: "उपलब्ध नहीं",

    reject: "अस्वीकार करें",
    approve: "स्वीकृत करें",
    processing: "प्रक्रिया जारी है...",

    rejectionPrompt:
      "इस व्यवसाय प्रोफ़ाइल को अस्वीकार करने का कारण दर्ज करें:",
    rejectionRequired:
      "व्यवसाय को अस्वीकार करने का कारण आवश्यक है।",
    approvedMessage:
      "व्यवसाय प्रोफ़ाइल सफलतापूर्वक स्वीकृत की गई।",
    rejectedMessage:
      "व्यवसाय प्रोफ़ाइल सफलतापूर्वक अस्वीकार की गई।",
  },
};

const categoryTranslations = {
  "Tiffin Services": "टिफिन सेवाएं",
  Tailoring: "सिलाई",
  "Beauty Services": "सौंदर्य सेवाएं",
  Handicrafts: "हस्तशिल्प",
  "Home Bakery": "होम बेकरी",
  Tutoring: "शिक्षण",
  Other: "अन्य",
};

export default function AdminDashboard() {
  const { language } = useLanguage();

  const text = translations[language] || translations.EN;

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [processingAction, setProcessingAction] =
    useState("");
  const [error, setError] = useState("");
  const [messageKey, setMessageKey] = useState("");

  const loadBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPendingBusinesses();
      setBusinesses(data.businesses || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBusinesses();
  }, [loadBusinesses]);

  const displayCategory = (category) => {
    if (language === "HI") {
      return categoryTranslations[category] || category;
    }

    return category;
  };

  const formatDate = (date) => {
    if (!date) {
      return text.notAvailable;
    }

    return new Date(date).toLocaleDateString(
      language === "HI" ? "hi-IN" : "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getSuccessMessage = () => {
    if (messageKey === "approved") {
      return text.approvedMessage;
    }

    if (messageKey === "rejected") {
      return text.rejectedMessage;
    }

    return "";
  };

  const approveBusiness = async (businessId) => {
    try {
      setProcessingId(businessId);
      setProcessingAction("approve");
      setError("");
      setMessageKey("");

      await updateBusinessStatus(
        businessId,
        "approved"
      );

      setBusinesses((currentBusinesses) =>
        currentBusinesses.filter(
          (business) => business._id !== businessId
        )
      );

      setMessageKey("approved");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
      setProcessingAction("");
    }
  };

  const rejectBusiness = async (businessId) => {
    const reason = window.prompt(text.rejectionPrompt);

    if (reason === null) {
      return;
    }

    if (!reason.trim()) {
      setError(text.rejectionRequired);
      return;
    }

    try {
      setProcessingId(businessId);
      setProcessingAction("reject");
      setError("");
      setMessageKey("");

      await updateBusinessStatus(
        businessId,
        "rejected",
        reason.trim()
      );

      setBusinesses((currentBusinesses) =>
        currentBusinesses.filter(
          (business) => business._id !== businessId
        )
      );

      setMessageKey("rejected");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
      setProcessingAction("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <header className="admin-header">
          <p className="admin-label">{text.label}</p>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </header>

        {messageKey && (
          <div
            className="admin-message success-message"
            role="status"
          >
            {getSuccessMessage()}
          </div>
        )}

        {error && (
          <div
            className="admin-message error-message"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading ? (
          <p className="admin-state">{text.loading}</p>
        ) : businesses.length === 0 ? (
          <section className="admin-empty">
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyMessage}</p>

            <button
              type="button"
              onClick={loadBusinesses}
            >
              {text.refresh}
            </button>
          </section>
        ) : (
          <section className="admin-grid">
            {businesses.map((business) => {
              const isProcessing =
                processingId === business._id;

              return (
                <article
                  className="approval-card"
                  key={business._id}
                >
                  <div className="approval-card-heading">
                    <div>
                      <span className="pending-badge">
                        {text.pending}
                      </span>

                      <h2>{business.businessName}</h2>

                      <p className="business-category">
                        {displayCategory(business.category)}
                      </p>
                    </div>

                    <span className="completion">
                      {business.profileCompletion}%{" "}
                      {text.complete}
                    </span>
                  </div>

                  <p className="business-description">
                    {business.description}
                  </p>

                  <dl className="business-details">
                    <div>
                      <dt>{text.entrepreneur}</dt>

                      <dd>
                        {business.owner?.fullName ||
                          text.notAvailable}
                      </dd>
                    </div>

                    <div>
                      <dt>{text.email}</dt>

                      <dd>
                        {business.owner?.email ||
                          text.notAvailable}
                      </dd>
                    </div>

                    <div>
                      <dt>{text.location}</dt>

                      <dd>
                        {business.locality},{" "}
                        {business.city} –{" "}
                        {business.pinCode}
                      </dd>
                    </div>

                    <div>
                      <dt>{text.experience}</dt>

                      <dd>
                        {business.experience || 0}{" "}
                        {text.years}
                      </dd>
                    </div>

                    <div>
                      <dt>{text.priceRange}</dt>

                      <dd>
                        ₹{business.minimumPrice || 0} – ₹
                        {business.maximumPrice || 0}
                      </dd>
                    </div>

                    <div>
                      <dt>{text.submitted}</dt>

                      <dd>
                        {formatDate(business.submittedAt)}
                      </dd>
                    </div>
                  </dl>

                  <div className="services-section">
                    <h3>{text.services}</h3>

                    {business.services?.length ? (
                      <ul>
                        {business.services.map((service) => (
                          <li key={service._id}>
                            <span>{service.name}</span>

                            <strong>
                              ₹{service.startingPrice}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{text.noServices}</p>
                    )}
                  </div>

                  <div className="approval-actions">
                    <button
                      type="button"
                      className="reject-button"
                      disabled={isProcessing}
                      onClick={() =>
                        rejectBusiness(business._id)
                      }
                    >
                      {isProcessing &&
                      processingAction === "reject"
                        ? text.processing
                        : text.reject}
                    </button>

                    <button
                      type="button"
                      className="approve-button"
                      disabled={isProcessing}
                      onClick={() =>
                        approveBusiness(business._id)
                      }
                    >
                      {isProcessing &&
                      processingAction === "approve"
                        ? text.processing
                        : text.approve}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </>
  );
}