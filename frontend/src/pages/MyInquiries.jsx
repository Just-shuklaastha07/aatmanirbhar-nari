import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSentInquiries } from "../services/inquiryService";
import "./MyInquiries.css";

export default function MyInquiries() {
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
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInquiries();
  }, [loadInquiries]);

  return (
    <>
      <Navbar />

      <main className="my-inquiries-page">
        <header className="inquiries-header">
          <p>MY REQUESTS</p>
          <h1>My Inquiries</h1>
          <span>
            View your messages and responses from entrepreneurs.
          </span>
        </header>

        {error && (
          <div className="inquiries-error">{error}</div>
        )}

        {loading ? (
          <p className="inquiries-state">Loading inquiries...</p>
        ) : inquiries.length === 0 ? (
          <section className="inquiries-empty">
            <h2>No inquiries yet</h2>
            <p>
              Explore businesses and send your first inquiry.
            </p>

            <a href="/explore">Explore Businesses</a>
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
                    <h2>
                      {inquiry.business?.businessName ||
                        "Business unavailable"}
                    </h2>

                    <p>
                      {inquiry.business?.category}
                      {inquiry.business?.city
                        ? ` • ${inquiry.business.city}`
                        : ""}
                    </p>
                  </div>

                  <span
                    className={`inquiry-status status-${inquiry.status}`}
                  >
                    {inquiry.status}
                  </span>
                </div>

                <div className="inquiry-section">
                  <h3>{inquiry.subject}</h3>
                  <p>{inquiry.message}</p>

                  <small>
                    Sent on{" "}
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </small>
                </div>

                {inquiry.response ? (
                  <div className="entrepreneur-response">
                    <h3>Entrepreneur’s response</h3>
                    <p>{inquiry.response}</p>

                    {inquiry.respondedAt && (
                      <small>
                        Responded on{" "}
                        {new Date(
                          inquiry.respondedAt
                        ).toLocaleString()}
                      </small>
                    )}
                  </div>
                ) : (
                  <div className="waiting-response">
                    Waiting for the entrepreneur’s response.
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