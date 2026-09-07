import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Email address is required.");
      setMessage("");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      setMessage("");
      return;
    }

    setError("");
    setMessage(
      "Password reset request submitted. Email functionality will be connected later."
    );
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="auth-card auth-card-small">
          <p className="auth-label">Account recovery</p>
          <h1>Forgot your password?</h1>

          <p className="auth-subtitle">
            Enter your registered email address to request a reset link.
          </p>

          {message && (
            <div className="auth-success" role="status">
              {message}
            </div>
          )}

          <form className="auth-form single-column" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="resetEmail">Email address</label>
              <input
                id="resetEmail"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="name@example.com"
              />

              {error && <span className="form-error">{error}</span>}
            </div>

            <button type="submit" className="auth-submit-button">
              Send Reset Link
            </button>
          </form>

          <p className="auth-switch">
            Remembered your password? <Link to="/login">Back to login</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}