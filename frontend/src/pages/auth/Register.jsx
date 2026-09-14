import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import "./Auth.css";

const initialForm = {
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  language: "English",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

export default function Register() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const validRoles = ["entrepreneur", "customer"];

  if (!validRoles.includes(role)) {
    return <Navigate to="/select-role" replace />;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setApiError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    if (!form.fullName.trim()) {
      newErrors.fullName = t(
        "auth.register.fullNameRequired"
      );
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = t(
        "auth.register.fullNameLength"
      );
    }

    if (!form.email.trim()) {
      newErrors.email = t("auth.register.emailRequired");
    } else if (!emailPattern.test(form.email.trim())) {
      newErrors.email = t("auth.register.invalidEmail");
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = t("auth.register.mobileRequired");
    } else if (!mobilePattern.test(form.mobile.trim())) {
      newErrors.mobile = t("auth.register.invalidMobile");
    }

    if (!form.city.trim()) {
      newErrors.city = t("auth.register.cityRequired");
    }

    if (!form.password) {
      newErrors.password = t(
        "auth.register.passwordRequired"
      );
    } else if (form.password.length < 8) {
      newErrors.password = t(
        "auth.register.passwordLength"
      );
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = t(
        "auth.register.confirmRequired"
      );
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t(
        "auth.register.passwordMismatch"
      );
    }

    if (!form.termsAccepted) {
      newErrors.termsAccepted = t(
        "auth.register.termsRequired"
      );
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);
    setApiError("");
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      await register({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        city: form.city.trim(),
        language: form.language,
        password: form.password,
        role,
      });

      setSuccessMessage(t("auth.register.success"));

      setTimeout(() => {
        navigate(role === "entrepreneur" ? "/start" : "/explore");
      }, 1000);
    } catch (error) {
      setApiError(
        error.message || t("auth.register.failed")
      );
    } finally {
      setLoading(false);
    }
  };

  const pageTitle =
    role === "entrepreneur"
      ? t("auth.register.entrepreneurTitle")
      : t("auth.register.customerTitle");

  const submitText =
    role === "entrepreneur"
      ? t("auth.register.createEntrepreneur")
      : t("auth.register.createCustomer");

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-label">
            {t("auth.register.label")}
          </p>

          <h1>{pageTitle}</h1>

          <p className="auth-subtitle">
            {t("auth.register.subtitle")}
          </p>

          {successMessage && (
            <div className="auth-success" role="status">
              {successMessage}
            </div>
          )}

          {apiError && (
            <div className="auth-error-message" role="alert">
              {apiError}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-group full-width">
              <label htmlFor="fullName">
                {t("auth.register.fullName")}
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder={t(
                  "auth.register.fullNamePlaceholder"
                )}
                autoComplete="name"
              />

              {errors.fullName && (
                <span className="form-error">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="registerEmail">
                {t("auth.register.email")}
              </label>

              <input
                id="registerEmail"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
              />

              {errors.email && (
                <span className="form-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">
                {t("auth.register.mobile")}
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder={t(
                  "auth.register.mobilePlaceholder"
                )}
                maxLength="10"
                inputMode="numeric"
                autoComplete="tel"
              />

              {errors.mobile && (
                <span className="form-error">
                  {errors.mobile}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="city">
                {t("auth.register.city")}
              </label>

              <input
                id="city"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder={t(
                  "auth.register.cityPlaceholder"
                )}
                autoComplete="address-level2"
              />

              {errors.city && (
                <span className="form-error">
                  {errors.city}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="language">
                {t("auth.register.preferredLanguage")}
              </label>

              <select
                id="language"
                name="language"
                value={form.language}
                onChange={handleChange}
              >
                <option value="English">
                  {t("auth.register.english")}
                </option>

                <option value="Hindi">
                  {t("auth.register.hindi")}
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="registerPassword">
                {t("auth.register.password")}
              </label>

              <div className="password-field">
                <input
                  id="registerPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t(
                    "auth.register.passwordPlaceholder"
                  )}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? t("auth.register.hide")
                      : t("auth.register.show")
                  }
                >
                  {showPassword
                    ? t("auth.register.hide")
                    : t("auth.register.show")}
                </button>
              </div>

              {errors.password && (
                <span className="form-error">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                {t("auth.register.confirmPassword")}
              </label>

              <div className="password-field">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder={t(
                    "auth.register.confirmPasswordPlaceholder"
                  )}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? t("auth.register.hide")
                      : t("auth.register.show")
                  }
                >
                  {showConfirmPassword
                    ? t("auth.register.hide")
                    : t("auth.register.show")}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="form-error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="form-group full-width">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                />

                <span>{t("auth.register.agree")}</span>
              </label>

              {errors.termsAccepted && (
                <span className="form-error">
                  {errors.termsAccepted}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit-button full-width"
              disabled={loading}
            >
              {loading
                ? t("auth.register.creating")
                : submitText}
            </button>
          </form>

          <p className="auth-switch">
            {t("auth.register.alreadyAccount")}{" "}
            <Link to="/login">
              {t("auth.register.login")}
            </Link>
          </p>

          <p className="auth-switch">
            {t("auth.register.wrongRole")}{" "}
            <Link to="/select-role">
              {t("auth.register.changeRole")}
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}