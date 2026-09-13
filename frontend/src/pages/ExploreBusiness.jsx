import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InquiryForm from "../components/InquiryForm";
import { getApprovedBusinesses } from "../services/exploreService";
import "./ExploreBusiness.css";

const categories = [
  "Tiffin Services",
  "Tailoring",
  "Beauty Services",
  "Handicrafts",
  "Home Bakery",
  "Tutoring",
  "Other",
];

const getCategoryIcon = (category) => {
  switch (category) {
    case "Tiffin Services":
      return "🍱";
    case "Tailoring":
      return "🧵";
    case "Beauty Services":
      return "💄";
    case "Home Bakery":
      return "🧁";
    case "Tutoring":
      return "📚";
    default:
      return "🎨";
  }
};

export default function ExploreBusiness() {
  const [businesses, setBusinesses] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    city: "",
  });

  const [activeFilters, setActiveFilters] = useState({
    search: "",
    category: "",
    city: "",
  });

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApprovedBusinesses(activeFilters);
      setBusinesses(data.businesses || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [activeFilters]);

  useEffect(() => {
    loadBusinesses();
  }, [loadBusinesses]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveFilters({ ...filters });
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: "",
      category: "",
      city: "",
    };

    setFilters(emptyFilters);
    setActiveFilters(emptyFilters);
  };

  return (
    <>
      <Navbar />

      <main className="explore-page">
        <section className="explore-heading">
          <p>DISCOVER LOCAL TALENT</p>

          <h1>Explore Women-led Businesses</h1>

          <span>
            Find trusted products and services offered by women entrepreneurs
            near you.
          </span>
        </section>

        <form className="explore-filters" onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search businesses or services"
            aria-label="Search businesses"
          />

          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="Enter city"
            aria-label="Filter by city"
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>

          <button type="submit" className="search-button">
            Search
          </button>

          <button
            type="button"
            className="clear-button"
            onClick={clearFilters}
          >
            Clear
          </button>
        </form>

        {error && <div className="explore-error">{error}</div>}

        {loading ? (
          <p className="explore-status">Loading businesses...</p>
        ) : businesses.length === 0 ? (
          <section className="explore-empty">
            <h2>No businesses found</h2>
            <p>Try changing your search or filters.</p>
          </section>
        ) : (
          <>
            <p className="result-count">
              {businesses.length} approved{" "}
              {businesses.length === 1 ? "business" : "businesses"} found
            </p>

            <section className="explore-grid">
              {businesses.map((business) => (
                <article className="explore-card" key={business._id}>
                  <div className="business-card-image">
                    {business.businessImages?.[0] ? (
                      <img
                        src={business.businessImages[0]}
                        alt={business.businessName}
                      />
                    ) : (
                      <span aria-hidden="true">
                        {getCategoryIcon(business.category)}
                      </span>
                    )}
                  </div>

                  <div className="explore-card-content">
                    <span className="category-label">
                      {business.category}
                    </span>

                    <h2>{business.businessName}</h2>

                    <p className="owner-name">
                      By{" "}
                      {business.owner?.fullName ||
                        "Local entrepreneur"}
                    </p>

                    <p className="card-description">
                      {business.description}
                    </p>

                    <div className="card-information">
                      <span>
                        📍 {business.locality}, {business.city}
                      </span>

                      <span>
                        ₹{business.minimumPrice || 0} – ₹
                        {business.maximumPrice || 0}
                      </span>
                    </div>

                    <h3>Services</h3>

                    {business.services?.length > 0 ? (
                      <ul className="card-services">
                        {business.services
                          .slice(0, 3)
                          .map((service) => (
                            <li key={service._id}>
                              <span>{service.name}</span>

                              <strong>
                                From ₹{service.startingPrice}
                              </strong>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p>No services listed.</p>
                    )}

                    {/* Add the Send Inquiry button here */}
                    <button
                      type="button"
                      className="inquiry-button"
                      onClick={() =>
                        setSelectedBusiness(business)
                      }
                    >
                      Send Inquiry
                    </button>

                    {business.whatsappNumber ? (
                      <a
                        className="contact-button"
                        href={`https://wa.me/91${business.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact on WhatsApp
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="contact-button disabled-button"
                        disabled
                      >
                        Contact unavailable
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

      {/* Inquiry popup */}
      {selectedBusiness && (
        <InquiryForm
          businessId={selectedBusiness._id}
          businessName={selectedBusiness.businessName}
          onClose={() => setSelectedBusiness(null)}
        />
      )}

      <Footer />
    </>
  );
}