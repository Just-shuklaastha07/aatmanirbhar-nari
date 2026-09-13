import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getPendingBusinesses,
  updateBusinessStatus,
} from "../../services/adminService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  const approveBusiness = async (businessId) => {
    try {
      setProcessingId(businessId);
      setError("");
      setMessage("");

      await updateBusinessStatus(businessId, "approved");

      setBusinesses((currentBusinesses) =>
        currentBusinesses.filter(
          (business) => business._id !== businessId
        )
      );

      setMessage("Business profile approved successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
    }
  };

  const rejectBusiness = async (businessId) => {
    const reason = window.prompt(
      "Enter the reason for rejecting this business profile:"
    );

    if (reason === null) {
      return;
    }

    if (!reason.trim()) {
      setError("A rejection reason is required.");
      return;
    }

    try {
      setProcessingId(businessId);
      setError("");
      setMessage("");

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

      setMessage("Business profile rejected successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setProcessingId("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <div className="admin-header">
          <p className="admin-label">ADMIN PANEL</p>
          <h1>Business Approval Dashboard</h1>
          <p>Review submitted businesses before publishing them.</p>
        </div>

        {message && (
          <div className="admin-message success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="admin-message error-message">
            {error}
          </div>
        )}

        {loading ? (
          <p className="admin-state">Loading pending businesses...</p>
        ) : businesses.length === 0 ? (
          <div className="admin-empty">
            <h2>No pending profiles</h2>
            <p>All submitted business profiles have been reviewed.</p>

            <button type="button" onClick={loadBusinesses}>
              Refresh
            </button>
          </div>
        ) : (
          <section className="admin-grid">
            {businesses.map((business) => (
              <article className="approval-card" key={business._id}>
                <div className="approval-card-heading">
                  <div>
                    <span className="pending-badge">Pending</span>
                    <h2>{business.businessName}</h2>
                    <p className="business-category">
                      {business.category}
                    </p>
                  </div>

                  <span className="completion">
                    {business.profileCompletion}% complete
                  </span>
                </div>

                <p className="business-description">
                  {business.description}
                </p>

                <dl className="business-details">
                  <div>
                    <dt>Entrepreneur</dt>
                    <dd>
                      {business.owner?.fullName || "Not available"}
                    </dd>
                  </div>

                  <div>
                    <dt>Email</dt>
                    <dd>{business.owner?.email || "Not available"}</dd>
                  </div>

                  <div>
                    <dt>Location</dt>
                    <dd>
                      {business.locality}, {business.city} –{" "}
                      {business.pinCode}
                    </dd>
                  </div>

                  <div>
                    <dt>Experience</dt>
                    <dd>{business.experience || 0} years</dd>
                  </div>

                  <div>
                    <dt>Price range</dt>
                    <dd>
                      ₹{business.minimumPrice || 0} – ₹
                      {business.maximumPrice || 0}
                    </dd>
                  </div>

                  <div>
                    <dt>Submitted</dt>
                    <dd>
                      {business.submittedAt
                        ? new Date(
                            business.submittedAt
                          ).toLocaleDateString()
                        : "Not available"}
                    </dd>
                  </div>
                </dl>

                <div className="services-section">
                  <h3>Services</h3>

                  {business.services?.length ? (
                    <ul>
                      {business.services.map((service) => (
                        <li key={service._id}>
                          <span>{service.name}</span>
                          <strong>₹{service.startingPrice}</strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No services provided.</p>
                  )}
                </div>

                <div className="approval-actions">
                  <button
                    type="button"
                    className="reject-button"
                    disabled={processingId === business._id}
                    onClick={() => rejectBusiness(business._id)}
                  >
                    Reject
                  </button>

                  <button
                    type="button"
                    className="approve-button"
                    disabled={processingId === business._id}
                    onClick={() => approveBusiness(business._id)}
                  >
                    {processingId === business._id
                      ? "Processing..."
                      : "Approve"}
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}