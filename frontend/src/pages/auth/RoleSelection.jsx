import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Auth.css";

export default function RoleSelection() {
  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="role-container">
          <p className="auth-label">Join our community</p>
          <h1>How would you like to use the platform?</h1>

          <p className="auth-subtitle">
            Select your role to create the correct account.
          </p>

          <div className="role-grid">
            <article className="role-card">
              <div className="role-icon" aria-hidden="true">
                👩‍💼
              </div>

              <h2>Woman Entrepreneur</h2>

              <p>
                Create your business profile, showcase services and receive
                customer inquiries.
              </p>

              <Link
                to="/register/entrepreneur"
                className="auth-primary-button"
              >
                Join as Entrepreneur
              </Link>
            </article>

            <article className="role-card">
              <div className="role-icon" aria-hidden="true">
                🛍️
              </div>

              <h2>Customer</h2>

              <p>
                Discover trusted women-led businesses and send service
                inquiries.
              </p>

              <Link to="/register/customer" className="auth-primary-button">
                Join as Customer
              </Link>
            </article>
          </div>

          <p className="auth-switch">
            Already registered? <Link to="/login">Log in</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}