import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InquiryForm from "../components/InquiryForm";
import { useLanguage } from "../context/LanguageContext";
import { getApprovedBusinesses } from "../services/exploreService";
import "./ExploreBusiness.css";

const categoryOptions = [
  {
    value: "Tiffin Services",
    translation: "explore.categories.tiffin",
  },
  {
    value: "Tailoring",
    translation: "explore.categories.tailoring",
  },
  {
    value: "Beauty Services",
    translation: "explore.categories.beauty",
  },
  {
    value: "Handicrafts",
    translation: "explore.categories.handicrafts",
  },
  {
    value: "Home Bakery",
    translation: "explore.categories.bakery",
  },
  {
    value: "Tutoring",
    translation: "explore.categories.tutoring",
  },
  {
    value: "Other",
    translation: "explore.categories.other",
  },
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

const getCategoryTranslationKey = (category) => {
  const categoryOption = categoryOptions.find(
    (option) => option.value === category
  );

  return categoryOption?.translation;
};

export default function ExploreBusiness() {
  const { t } = useLanguage();

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

  const translateCategory = (category) => {
    const translationKey = getCategoryTranslationKey(category);

    return translationKey ? t(translationKey) : category;
  };

  return (
    <>
      <Navbar />

      <main className="explore-page">
        <section className="explore-heading">
          <p>{t("explore.label")}</p>
          <h1>{t("explore.title")}</h1>
          <span>{t("explore.description")}</span>
        </section>

        <form className="explore-filters" onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder={t("explore.searchPlaceholder")}
            aria-label={t("explore.searchPlaceholder")}
          />

          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder={t("explore.cityPlaceholder")}
            aria-label={t("explore.cityPlaceholder")}
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            aria-label={t("explore.allCategories")}
          >
            <option value="">
              {t("explore.allCategories")}
            </option>

            {categoryOptions.map((category) => (
              <option value={category.value} key={category.value}>
                {t(category.translation)}
              </option>
            ))}
          </select>

          <button type="submit" className="search-button">
            {t("explore.search")}
          </button>

          <button
            type="button"
            className="clear-button"
            onClick={clearFilters}
          >
            {t("explore.clear")}
          </button>
        </form>

        {error && <div className="explore-error">{error}</div>}

        {loading ? (
          <p className="explore-status">
            {t("explore.loading")}
          </p>
        ) : businesses.length === 0 ? (
          <section className="explore-empty">
            <h2>{t("explore.noBusinesses")}</h2>
            <p>{t("explore.changeFilters")}</p>
          </section>
        ) : (
          <>
            <p className="result-count">
              {businesses.length} {t("explore.approved")}{" "}
              {businesses.length === 1
                ? t("explore.business")
                : t("explore.businesses")}{" "}
              {t("explore.found")}
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
                      {translateCategory(business.category)}
                    </span>

                    <h2>{business.businessName}</h2>

                    <p className="owner-name">
                      {t("explore.by")}{" "}
                      {business.owner?.fullName ||
                        t("explore.localEntrepreneur")}
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

                    <h3>{t("explore.services")}</h3>

                    {business.services?.length > 0 ? (
                      <ul className="card-services">
                        {business.services
                          .slice(0, 3)
                          .map((service) => (
                            <li key={service._id}>
                              <span>{service.name}</span>

                              <strong>
                                {t("explore.from")} ₹
                                {service.startingPrice}
                              </strong>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p>{t("explore.noServices")}</p>
                    )}

                    <button
                      type="button"
                      className="inquiry-button"
                      onClick={() =>
                        setSelectedBusiness(business)
                      }
                    >
                      {t("explore.sendInquiry")}
                    </button>

                    {business.whatsappNumber ? (
                      <a
                        className="contact-button"
                        href={`https://wa.me/91${business.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("explore.whatsapp")}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="contact-button disabled-button"
                        disabled
                      >
                        {t("explore.contactUnavailable")}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

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