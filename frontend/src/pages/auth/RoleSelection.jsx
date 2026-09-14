import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";
import "./Auth.css";

export default function RoleSelection() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <section className="role-container">
          <p className="auth-label">
            {t("auth.role.label")}
          </p>

          <h1>{t("auth.role.title")}</h1>

          <p className="auth-subtitle">
            {t("auth.role.subtitle")}
          </p>

          <div className="role-grid">
            <article className="role-card">
              <div className="role-icon" aria-hidden="true">
                👩‍💼
              </div>

              <h2>{t("auth.role.entrepreneur")}</h2>
              <p>{t("auth.role.entrepreneurDescription")}</p>

              <Link
                to="/register/entrepreneur"
                className="auth-primary-button"
              >
                {t("auth.role.joinEntrepreneur")}
              </Link>
            </article>

            <article className="role-card">
              <div className="role-icon" aria-hidden="true">
                🛍️
              </div>

              <h2>{t("auth.role.customer")}</h2>
              <p>{t("auth.role.customerDescription")}</p>

              <Link
                to="/register/customer"
                className="auth-primary-button"
              >
                {t("auth.role.joinCustomer")}
              </Link>
            </article>
          </div>

          <p className="auth-switch">
            {t("auth.role.alreadyRegistered")}{" "}
            <Link to="/login">
              {t("auth.common.login")}
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}