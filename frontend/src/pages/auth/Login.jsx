import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    }

    if (!form.role) {
      newErrors.role = "Please select your role.";
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

      setSuccessMessage("Logged in successfully!");

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
        error.message ||
          "Unable to log in. Please check your details."
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
          <p className="auth-label">Welcome back</p>

          <h1>Log in to your account</h1>

          <p className="auth-subtitle">
            Continue managing or discovering local businesses.
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
              <label htmlFor="loginRole">Login as</label>

              <select
                id="loginRole"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="entrepreneur">
                  Entrepreneur
                </option>
                <option value="admin">Administrator</option>
              </select>

              {errors.role && (
                <span className="form-error">
                  {errors.role}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loginEmail">
                Email address
              </label>

              <input
                id="loginEmail"
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
              <label htmlFor="loginPassword">Password</label>

              <div className="password-field">
                <input
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            <div className="form-options">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />

                <span>Remember me</span>
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <Link to="/select-role">Create account</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}