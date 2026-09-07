import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link
          to="/"
          className="logo"
          aria-label="Aatmanirbhar Nari home"
          onClick={closeMenu}
        >
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
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          ☰
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/explore" onClick={closeMenu}>
          Explore Businesses
        </NavLink>

        <NavLink to="/start" onClick={closeMenu}>
          Start Your Business
        </NavLink>

        <NavLink to="/learn" onClick={closeMenu}>
          Learn
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <div className="navbar-actions">
          <select
            aria-label="Select language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="EN">English</option>
            <option value="HI">हिन्दी</option>
          </select>

          <Link to="/login" className="login-btn" onClick={closeMenu}>
            Login
          </Link>

          <Link
            to="/register/entrepreneur"
            className="join-btn"
            onClick={closeMenu}
          >
            Join as Entrepreneur
          </Link>
        </div>
      </div>
    </nav>
  );
}