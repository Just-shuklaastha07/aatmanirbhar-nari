import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import BusinessCard from "../components/BusinessCard";
import "./LandingPage.css";

const popularCategories = [
  { id: 1, name: "Handicrafts", image: "/placeholder-category1.jpg" },
  { id: 2, name: "Cooking", image: "/placeholder-category2.jpg" },
  { id: 3, name: "Tailoring", image: "/placeholder-category3.jpg" },
  { id: 4, name: "Tutoring", image: "/placeholder-category4.jpg" },
];

const featuredBusinesses = [
  { id: 1, name: "Seema's Handmade Toys", category: "Handicrafts", image: "/placeholder-business1.jpg" },
  { id: 2, name: "Anita's Tiffin Service", category: "Cooking", image: "/placeholder-business2.jpg" },
  { id: 3, name: "Radha Tailoring", category: "Tailoring", image: "/placeholder-business3.jpg" },
];

const learningResources = [
  { id: 1, title: "How to Start a Business", link: "#", description: "Basics of entrepreneurship." },
  { id: 2, title: "Marketing Tips", link: "#", description: "Grow your customer base." },
  { id: 3, title: "Managing Finances", link: "#", description: "Keep your accounts healthy." },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h1>Turn Your Skills Into a Successful Home Business</h1>
            <p className="tagline">Ghar se shuruaat, sapno tak udaan</p>
            <form className="search-form" aria-label="Search location and category">
              <input
                type="text"
                placeholder="Enter location"
                aria-label="Location"
                name="location"
              />
              <select aria-label="Category" name="category" defaultValue="">
                <option value="" disabled>
                  Select category
                </option>
                <option>Handicrafts</option>
                <option>Cooking</option>
                <option>Tailoring</option>
                <option>Tutoring</option>
              </select>
              <button type="submit" aria-label="Search">Search</button>
            </form>
          </div>
          <div className="hero-image">
            <img
              src="/placeholder-hero.jpg"
              alt="Woman working on home business"
              loading="lazy"
            />
          </div>
        </section>

        {/* Popular Categories */}
        <section className="categories-section" aria-label="Popular categories">
          <h2>Popular Categories</h2>
          <div className="categories-grid">
            {popularCategories.map((cat) => (
              <CategoryCard key={cat.id} name={cat.name} image={cat.image} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works" aria-label="How It Works">
          <h2>How It Works</h2>
          <ol className="how-steps">
            <li>
              <strong>Create Profile:</strong> Sign up and set up your home business profile.
            </li>
            <li>
              <strong>List Services:</strong> Showcase your products or services.
            </li>
            <li>
              <strong>Connect & Grow:</strong> Reach local customers and grow your business.
            </li>
          </ol>
        </section>

        {/* Featured Businesses */}
        <section className="featured-businesses" aria-label="Featured women-led businesses">
          <h2>Featured Women-led Businesses</h2>
          <div className="businesses-grid">
            {featuredBusinesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                name={biz.name}
                category={biz.category}
                image={biz.image}
              />
            ))}
          </div>
        </section>

        {/* Learning Resources */}
        <section className="learning-resources" aria-label="Learning Resources">
          <h2>Learning Resources</h2>
          <ul className="resources-list">
            {learningResources.map((res) => (
              <li key={res.id}>
                <a href={res.link} target="_blank" rel="noopener noreferrer">
                  <strong>{res.title}</strong>: {res.description}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Success Story */}
        <section className="success-story" aria-label="Success story">
          <h2>Success Story</h2>
          <blockquote>
            “Thanks to Aatmanirbhar Nari, I transformed my cooking skills into a thriving home business. Now I support my family and dream big!”<br />
            <cite>- Priya Sharma, Uttar Pradesh</cite>
          </blockquote>
        </section>

        {/* Impact Stats */}
        <section className="impact-stats" aria-label="Impact statistics">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div>
              <strong>500+</strong>
              <span>Women Entrepreneurs</span>
            </div>
            <div>
              <strong>1200+</strong>
              <span>Businesses Created</span>
            </div>
            <div>
              <strong>4500+</strong>
              <span>Customers Reached</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>Learning Resources</span>
            </div>
          </div>
        </section>

        {/* Final Call To Action */}
        <section className="final-cta" aria-label="Join as entrepreneur call to action">
          <h2>Ready to Start Your Home Business?</h2>
          <a href="/start" className="join-button">
            Join as Entrepreneur
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}