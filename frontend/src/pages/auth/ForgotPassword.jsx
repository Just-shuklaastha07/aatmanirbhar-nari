import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";
import "./Auth.css";

export default function ForgotPassword() {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError(t("auth.validation.emailRequired"));
      setMessage("");
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setError(t("auth.validation.invalidEmail"));
      setMessage("");
      return;
    }

    setError("");
    setMessage(t("auth.forgot.success"));
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="auth-card auth-card-small">
          <p className="auth-label">
            {t("auth.forgot.label")}
          </p>

          <h1>{t("auth.forgot.title")}</h1>

          <p className="auth-subtitle">
            {t("auth.forgot.subtitle")}
          </p>

          {message && (
            <div className="auth-success" role="status">
              {message}
            </div>
          )}

          <form
            className="auth-form single-column"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="resetEmail">
                {t("auth.forgot.email")}
              </label>

              <input
                id="resetEmail"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setMessage("");
                }}
                placeholder={t("auth.common.emailPlaceholder")}
              />

              {error && (
                <span className="form-error">{error}</span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-button"
            >
              {t("auth.forgot.submit")}
            </button>
          </form>

          <p className="auth-switch">
            {t("auth.forgot.remembered")}{" "}
            <Link to="/login">
              {t("auth.forgot.back")}
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}