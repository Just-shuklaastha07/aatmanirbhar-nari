import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (!form.email.trim()) {
      newErrors.email = t("auth.validation.emailRequired");
    } else if (!emailPattern.test(form.email.trim())) {
      newErrors.email = t("auth.validation.invalidEmail");
    }

    if (!form.password) {
      newErrors.password = t(
        "auth.validation.passwordRequired"
      );
    }

    if (!form.role) {
      newErrors.role = t("auth.validation.roleRequired");
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

      const data = await login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      setSuccessMessage(t("auth.login.success"));

      setTimeout(() => {
        if (data.user.role === "entrepreneur") {
          navigate("/start");
        } else if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/explore");
        }
      }, 800);
    } catch (error) {
      setApiError(
        error.message || t("auth.validation.loginFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="auth-card auth-card-small">
          <p className="auth-label">
            {t("auth.login.label")}
          </p>

          <h1>{t("auth.login.title")}</h1>

          <p className="auth-subtitle">
            {t("auth.login.subtitle")}
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
            className="auth-form single-column"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-group">
              <label htmlFor="loginRole">
                {t("auth.login.loginAs")}
              </label>

              <select
                id="loginRole"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="customer">
                  {t("auth.login.customer")}
                </option>

                <option value="entrepreneur">
                  {t("auth.login.entrepreneur")}
                </option>

                <option value="admin">
                  {t("auth.login.administrator")}
                </option>
              </select>

              {errors.role && (
                <span className="form-error">
                  {errors.role}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loginEmail">
                {t("auth.login.email")}
              </label>

              <input
                id="loginEmail"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("auth.common.emailPlaceholder")}
                autoComplete="email"
              />

              {errors.email && (
                <span className="form-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">
                {t("auth.login.password")}
              </label>

              <div className="password-field">
                <input
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t(
                    "auth.login.passwordPlaceholder"
                  )}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? t("auth.login.hide")
                      : t("auth.login.show")
                  }
                >
                  {showPassword
                    ? t("auth.login.hide")
                    : t("auth.login.show")}
                </button>
              </div>

              {errors.password && (
                <span className="form-error">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />

                <span>{t("auth.login.remember")}</span>
              </label>

              <Link to="/forgot-password">
                {t("auth.login.forgot")}
              </Link>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading
                ? t("auth.login.submitting")
                : t("auth.login.submit")}
            </button>
          </form>

          <p className="auth-switch">
            {t("auth.login.noAccount")}{" "}
            <Link to="/select-role">
              {t("auth.login.createAccount")}
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}