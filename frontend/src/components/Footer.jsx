import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">AN</div>

          <div>
            <h3>Aatmanirbhar Nari</h3>
            <p>Ghar se shuruaat, sapno tak udaan</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/start">Start Business</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Aatmanirbhar Nari. All rights reserved.</p>
      </div>
    </footer>
  );
}