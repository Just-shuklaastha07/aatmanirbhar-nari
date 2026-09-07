import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import BusinessCard from "../components/BusinessCard";
import heroImage from "../assets/hero.png";
import "./LandingPage.css";

const popularCategories = [
  {
    id: 1,
    name: "Handicrafts",
    icon: "🎨",
  },
  {
    id: 2,
    name: "Tiffin Services",
    icon: "🍱",
  },
  {
    id: 3,
    name: "Tailoring",
    icon: "🧵",
  },
  {
    id: 4,
    name: "Tutoring",
    icon: "📚",
  },
];

const featuredBusinesses = [
  {
    id: 1,
    name: "Seema's Handmade Toys",
    category: "Handicrafts",
  },
  {
    id: 2,
    name: "Anita's Tiffin Service",
    category: "Cooking",
  },
  {
    id: 3,
    name: "Radha Tailoring",
    category: "Tailoring",
  },
];

const learningResources = [
  {
    id: 1,
    title: "How to Start a Business",
    description: "Learn the basics of starting a home business.",
  },
  {
    id: 2,
    title: "Marketing Tips",
    description: "Discover simple ways to grow your customer base.",
  },
  {
    id: 3,
    title: "Managing Finances",
    description: "Learn how to track expenses, pricing and profit.",
  },
];

const workSteps = [
  {
    id: 1,
    icon: "👤",
    title: "Create Profile",
    description: "Sign up and create your home-business profile.",
  },
  {
    id: 2,
    icon: "🛍️",
    title: "List Services",
    description: "Showcase your products, prices and availability.",
  },
  {
    id: 3,
    icon: "🤝",
    title: "Connect & Grow",
    description: "Receive inquiries and connect with local customers.",
  },
];

export default function LandingPage() {
  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const location = formData.get("location");
    const category = formData.get("category");

    console.log("Search details:", {
      location,
      category,
    });
  };

  return (
    <>
      <Navbar />

      <main className="landing-container">
        {/* Hero section */}
        <section className="hero-section">
          <div className="hero-text">
            <p className="hero-label">Empowering Women Entrepreneurs</p>

            <h1>Turn Your Skills Into a Successful Home Business</h1>

            <p className="tagline">
              Ghar se shuruaat, sapno tak udaan
            </p>

            <p className="hero-description">
              Create your business profile, showcase your services and connect
              with customers near you.
            </p>

            <form
              className="search-form"
              aria-label="Search businesses by location and category"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                name="location"
                placeholder="Enter your city or locality"
                aria-label="Location"
              />

              <select
                name="category"
                defaultValue=""
                aria-label="Business category"
              >
                <option value="" disabled>
                  Select category
                </option>

                <option value="Handicrafts">Handicrafts</option>
                <option value="Cooking">Tiffin Services</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Tutoring">Tutoring</option>
              </select>

              <button type="submit">
                Search
              </button>
            </form>

            <div className="hero-actions">
              <Link to="/start" className="primary-action">
                Start Your Business
              </Link>

              <Link to="/explore" className="secondary-action">
                Explore Businesses
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src={heroImage}
              alt="Indian woman managing her home business"
            />
          </div>
        </section>

        {/* Popular categories */}
        <section
          className="categories-section"
          aria-labelledby="categories-heading"
        >
          <p className="section-label">Discover local services</p>
          <h2 id="categories-heading">Popular Categories</h2>

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

        {/* How it works */}
        <section
          className="how-it-works"
          aria-labelledby="how-it-works-heading"
        >
          <p className="section-label">Simple and beginner-friendly</p>
          <h2 id="how-it-works-heading">How It Works</h2>

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

        {/* Featured businesses */}
        <section
          className="featured-businesses"
          aria-labelledby="businesses-heading"
        >
          <p className="section-label">Support local entrepreneurs</p>
          <h2 id="businesses-heading">Featured Women-Led Businesses</h2>

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
              View All Businesses
            </Link>
          </div>
        </section>

        {/* Learning resources */}
        <section
          className="learning-resources"
          aria-labelledby="resources-heading"
        >
          <p className="section-label">Learn and grow</p>
          <h2 id="resources-heading">Business Learning Resources</h2>

          <div className="resources-grid">
            {learningResources.map((resource) => (
              <article className="resource-card" key={resource.id}>
                <div className="resource-icon" aria-hidden="true">
                  📖
                </div>

                <h3>{resource.title}</h3>
                <p>{resource.description}</p>

                <Link to="/learn">
                  Start Learning
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Success story */}
        <section className="success-story" aria-labelledby="story-heading">
          <h2 id="story-heading">Success Story</h2>

          <blockquote>
            “Thanks to Aatmanirbhar Nari, I transformed my cooking skills
            into a thriving home business. Now I support my family and dream
            big!”

            <cite>— Priya Sharma, Uttar Pradesh</cite>
          </blockquote>
        </section>

        {/* Impact statistics */}
        <section className="impact-stats" aria-labelledby="impact-heading">
          <p className="section-label">Growing together</p>
          <h2 id="impact-heading">Our Impact</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <strong>500+</strong>
              <span>Women Entrepreneurs</span>
            </div>

            <div className="stat-card">
              <strong>1,200+</strong>
              <span>Businesses Created</span>
            </div>

            <div className="stat-card">
              <strong>4,500+</strong>
              <span>Customers Reached</span>
            </div>

            <div className="stat-card">
              <strong>150+</strong>
              <span>Learning Resources</span>
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section className="final-cta">
          <h2>Ready to Start Your Home Business?</h2>

          <p>
            Join the platform and take the first step towards financial
            independence.
          </p>

          <Link to="/start" className="join-button">
            Join as Entrepreneur
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}