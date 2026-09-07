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

  const roleName =
    role === "entrepreneur" ? "Entrepreneur" : "Customer";

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
      newErrors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must contain at least 3 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobilePattern.test(form.mobile.trim())) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.termsAccepted) {
      newErrors.termsAccepted =
        "You must accept the terms and privacy policy.";
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

      setSuccessMessage("Account created successfully!");

      setTimeout(() => {
        if (role === "entrepreneur") {
          navigate("/start");
        } else {
          navigate("/explore");
        }
      }, 1000);
    } catch (error) {
      setApiError(
        error.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-label">Create your account</p>

          <h1>Register as {roleName}</h1>

          <p className="auth-subtitle">
            Enter your details to begin your journey.
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
              <label htmlFor="fullName">Full name</label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
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
                Email address
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
              <label htmlFor="mobile">Mobile number</label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
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
              <label htmlFor="city">City</label>

              <input
                id="city"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter your city"
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
                Preferred language
              </label>

              <select
                id="language"
                name="language"
                value={form.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="registerPassword">
                Password
              </label>

              <div className="password-field">
                <input
                  id="registerPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
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
                Confirm password
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
                  placeholder="Enter password again"
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
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
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

                <span>
                  I agree to the terms and privacy policy.
                </span>
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
                ? "Creating Account..."
                : `Create ${roleName} Account`}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Log in</Link>
          </p>

          <p className="auth-switch">
            Selected the wrong role?{" "}
            <Link to="/select-role">Change role</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}