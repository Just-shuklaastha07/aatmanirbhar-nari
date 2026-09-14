import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "active-link" : "";

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark" aria-hidden="true">
            AN
          </span>

          <span>Aatmanirbhar Nari</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen((previousState) => !previousState)
          }
        >
          ☰
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/"
          end
          className={getNavLinkClass}
          onClick={closeMenu}
        >
          {t("navbar.home")}
        </NavLink>

        <NavLink
          to="/explore"
          className={getNavLinkClass}
          onClick={closeMenu}
        >
          {t("navbar.explore")}
        </NavLink>

        {!isAuthenticated && (
          <NavLink
            to="/start"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            {t("navbar.startBusiness")}
          </NavLink>
        )}

        {user?.role === "customer" && (
          <NavLink
            to="/my-inquiries"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            {t("navbar.myInquiries")}
          </NavLink>
        )}

        {user?.role === "entrepreneur" && (
          <>
            <NavLink
              to="/start"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              {t("navbar.myBusiness")}
            </NavLink>

            <NavLink
              to="/business-inquiries"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              {t("navbar.customerInquiries")}
            </NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            {t("navbar.adminDashboard")}
          </NavLink>
        )}

        <NavLink
          to="/learn"
          className={getNavLinkClass}
          onClick={closeMenu}
        >
          {t("navbar.learn")}
        </NavLink>

        <NavLink
          to="/about"
          className={getNavLinkClass}
          onClick={closeMenu}
        >
          {t("navbar.about")}
        </NavLink>

        <div className="navbar-actions">
          <select
            aria-label="Select language"
            value={language}
            onChange={(event) =>
              changeLanguage(event.target.value)
            }
          >
            <option value="EN">{t("navbar.english")}</option>
            <option value="HI">{t("navbar.hindi")}</option>
          </select>

          {isAuthenticated ? (
            <>
              <span className="navbar-user">
                {t("navbar.greeting")},{" "}
                {user?.fullName?.split(" ")[0] || "User"}
              </span>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn"
                onClick={closeMenu}
              >
                {t("navbar.login")}
              </Link>

              <Link
                to="/register/entrepreneur"
                className="join-btn"
                onClick={closeMenu}
              >
                {t("navbar.join")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}