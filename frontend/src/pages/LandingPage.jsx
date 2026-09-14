import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import BusinessCard from "../components/BusinessCard";
import { useLanguage } from "../context/LanguageContext";
import "./LandingPage.css";

export default function LandingPage() {
  const { t } = useLanguage();

  const popularCategories = [
    {
      id: 1,
      name: t("landing.categories.handicrafts"),
      icon: "🎨",
    },
    {
      id: 2,
      name: t("landing.categories.tiffin"),
      icon: "🍱",
    },
    {
      id: 3,
      name: t("landing.categories.tailoring"),
      icon: "🧵",
    },
    {
      id: 4,
      name: t("landing.categories.tutoring"),
      icon: "📚",
    },
  ];

  const featuredBusinesses = [
    {
      id: 1,
      name: "Seema's Handmade Toys",
      category: t("landing.categories.handicrafts"),
    },
    {
      id: 2,
      name: "Anita's Tiffin Service",
      category: t("landing.categories.tiffin"),
    },
    {
      id: 3,
      name: "Radha Tailoring",
      category: t("landing.categories.tailoring"),
    },
  ];

  const learningResources = [
    {
      id: 1,
      title: t("landing.resources.startTitle"),
      description: t("landing.resources.startDescription"),
    },
    {
      id: 2,
      title: t("landing.resources.marketingTitle"),
      description: t("landing.resources.marketingDescription"),
    },
    {
      id: 3,
      title: t("landing.resources.financeTitle"),
      description: t("landing.resources.financeDescription"),
    },
  ];

  const workSteps = [
    {
      id: 1,
      icon: "👤",
      title: t("landing.steps.createTitle"),
      description: t("landing.steps.createDescription"),
    },
    {
      id: 2,
      icon: "🛍️",
      title: t("landing.steps.servicesTitle"),
      description: t("landing.steps.servicesDescription"),
    },
    {
      id: 3,
      icon: "🤝",
      title: t("landing.steps.growTitle"),
      description: t("landing.steps.growDescription"),
    },
  ];

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Search details:", {
      location: formData.get("location"),
      category: formData.get("category"),
    });
  };

  return (
    <>
      <Navbar />

      <main className="landing-container">
        <section className="hero-section">
          <div className="hero-text">
            <p className="hero-label">
              {t("landing.heroLabel")}
            </p>

            <h1>{t("landing.heroTitle")}</h1>

            <p className="tagline">
              {t("landing.tagline")}
            </p>

            <p className="hero-description">
              {t("landing.heroDescription")}
            </p>

            <form
              className="search-form"
              aria-label={t("landing.search")}
              onSubmit={handleSearch}
            >
              <input
                type="text"
                name="location"
                placeholder={t("landing.locationPlaceholder")}
                aria-label={t("landing.locationPlaceholder")}
              />

              <select
                name="category"
                defaultValue=""
                aria-label={t("landing.selectCategory")}
              >
                <option value="" disabled>
                  {t("landing.selectCategory")}
                </option>

                <option value="Handicrafts">
                  {t("landing.categories.handicrafts")}
                </option>

                <option value="Tiffin Services">
                  {t("landing.categories.tiffin")}
                </option>

                <option value="Tailoring">
                  {t("landing.categories.tailoring")}
                </option>

                <option value="Tutoring">
                  {t("landing.categories.tutoring")}
                </option>
              </select>

              <button type="submit">
                {t("landing.search")}
              </button>
            </form>

            <div className="hero-actions">
              <Link to="/start" className="primary-action">
                {t("landing.startBusiness")}
              </Link>

              <Link to="/explore" className="secondary-action">
                {t("landing.exploreBusinesses")}
              </Link>
            </div>
          </div>

        </section>

        <section
          className="categories-section"
          aria-labelledby="categories-heading"
        >
          <p className="section-label">
            {t("landing.categoriesLabel")}
          </p>

          <h2 id="categories-heading">
            {t("landing.categoriesTitle")}
          </h2>

          <div className="categories-grid">
            {popularCategories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                icon={category.icon}
              />
            ))}
          </div>
        </section>

        <section
          className="how-it-works"
          aria-labelledby="how-it-works-heading"
        >
          <p className="section-label">
            {t("landing.howLabel")}
          </p>

          <h2 id="how-it-works-heading">
            {t("landing.howTitle")}
          </h2>

          <div className="steps-grid">
            {workSteps.map((step, index) => (
              <article className="step-card" key={step.id}>
                <span className="step-number">{index + 1}</span>

                <div className="step-icon" aria-hidden="true">
                  {step.icon}
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="featured-businesses"
          aria-labelledby="businesses-heading"
        >
          <p className="section-label">
            {t("landing.featuredLabel")}
          </p>

          <h2 id="businesses-heading">
            {t("landing.featuredTitle")}
          </h2>

          <div className="businesses-grid">
            {featuredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                name={business.name}
                category={business.category}
              />
            ))}
          </div>

          <div className="section-action">
            <Link to="/explore" className="secondary-action">
              {t("landing.viewAll")}
            </Link>
          </div>
        </section>

        <section
          className="learning-resources"
          aria-labelledby="resources-heading"
        >
          <p className="section-label">
            {t("landing.resourcesLabel")}
          </p>

          <h2 id="resources-heading">
            {t("landing.resourcesTitle")}
          </h2>

          <div className="resources-grid">
            {learningResources.map((resource) => (
              <article className="resource-card" key={resource.id}>
                <div className="resource-icon" aria-hidden="true">
                  📖
                </div>

                <h3>{resource.title}</h3>
                <p>{resource.description}</p>

                <Link to="/learn">
                  {t("landing.startLearning")}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          className="success-story"
          aria-labelledby="story-heading"
        >
          <h2 id="story-heading">
            {t("landing.storyTitle")}
          </h2>

          <blockquote>
            “{t("landing.story")}”
            <cite>{t("landing.storyAuthor")}</cite>
          </blockquote>
        </section>

        <section
          className="impact-stats"
          aria-labelledby="impact-heading"
        >
          <p className="section-label">
            {t("landing.impactLabel")}
          </p>

          <h2 id="impact-heading">
            {t("landing.impactTitle")}
          </h2>

          <div className="stats-grid">
            <div className="stat-card">
              <strong>500+</strong>
              <span>{t("landing.womenEntrepreneurs")}</span>
            </div>

            <div className="stat-card">
              <strong>1,200+</strong>
              <span>{t("landing.businessesCreated")}</span>
            </div>

            <div className="stat-card">
              <strong>4,500+</strong>
              <span>{t("landing.customersReached")}</span>
            </div>

            <div className="stat-card">
              <strong>150+</strong>
              <span>{t("landing.learningResources")}</span>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <h2>{t("landing.ctaTitle")}</h2>
          <p>{t("landing.ctaDescription")}</p>

          <Link to="/start" className="join-button">
            {t("landing.join")}
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}