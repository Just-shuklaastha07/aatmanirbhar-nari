import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">AN</div>

          <div>
            <h3>Aatmanirbhar Nari</h3>
            <p>{t("footer.tagline")}</p>
          </div>
        </div>

        <nav
          className="footer-links"
          aria-label="Footer navigation"
        >
          <Link to="/">{t("footer.home")}</Link>
          <Link to="/explore">{t("footer.explore")}</Link>
          <Link to="/start">{t("footer.startBusiness")}</Link>
          <Link to="/learn">{t("footer.learn")}</Link>
          <Link to="/about">{t("footer.about")}</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}