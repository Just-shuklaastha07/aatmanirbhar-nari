import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }

    console.log("Login details:", form);

    setMessage(
      "Login form submitted successfully. Backend connection will be added next."
    );
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

          {message && (
            <div className="auth-success" role="status">
              {message}
            </div>
          )}

          <form className="auth-form single-column" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="loginRole">Login as</label>
              <select
                id="loginRole"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="loginEmail">Email address</label>
              <input
                id="loginEmail"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
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
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <span className="form-error">{errors.password}</span>
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

              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="auth-submit-button">
              Log In
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