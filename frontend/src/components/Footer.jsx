import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" className="logo" aria-label="Aatmanirbhar Nari Home">
          <img src="/logo-placeholder.png" alt="Aatmanirbhar Nari logo" />
          <span>Aatmanirbhar Nari</span>
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/explore" onClick={() => setMenuOpen(false)}>
          Explore Businesses
        </NavLink>
        <NavLink to="/start" onClick={() => setMenuOpen(false)}>
          Start Your Business
        </NavLink>
        <NavLink to="/learn" onClick={() => setMenuOpen(false)}>
          Learn
        </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          About
        </NavLink>

        <div className="navbar-actions">
          <select
            aria-label="Select language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="EN">English</option>
            <option value="HI">हिन्दी</option>
          </select>
          <button className="login-btn" type="button">
            Login
          </button>
          <Link to="/start" className="join-btn" onClick={() => setMenuOpen(false)}>
            Join as Entrepreneur
          </Link>
        </div>
      </div>
    </nav>
  );
}
