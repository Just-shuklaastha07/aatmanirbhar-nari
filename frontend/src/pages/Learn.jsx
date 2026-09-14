import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  EN: {
    label: "LEARN AND GROW",
    title: "Learning Centre",
    subtitle:
      "Explore simple resources to start, manage and grow your home business.",
    resources: [
      {
        icon: "🚀",
        title: "Starting a Business",
        description:
          "Learn how to turn your skills into a home-based business.",
      },
      {
        icon: "📢",
        title: "Marketing Your Services",
        description:
          "Discover simple ways to promote your business and reach customers.",
      },
      {
        icon: "💰",
        title: "Managing Finances",
        description:
          "Understand pricing, expenses, income and profit management.",
      },
      {
        icon: "🤝",
        title: "Customer Communication",
        description:
          "Learn how to respond professionally and build customer trust.",
      },
    ],
    comingSoon: "Detailed learning resources will be added soon.",
  },

  HI: {
    label: "सीखें और आगे बढ़ें",
    title: "शिक्षण केंद्र",
    subtitle:
      "अपना घरेलू व्यवसाय शुरू करने, प्रबंधित करने और बढ़ाने के लिए सरल संसाधन देखें।",
    resources: [
      {
        icon: "🚀",
        title: "व्यवसाय शुरू करना",
        description:
          "जानें कि अपने कौशल को घरेलू व्यवसाय में कैसे बदलें।",
      },
      {
        icon: "📢",
        title: "सेवाओं का प्रचार",
        description:
          "अपने व्यवसाय का प्रचार करने और ग्राहकों तक पहुंचने के सरल तरीके जानें।",
      },
      {
        icon: "💰",
        title: "वित्तीय प्रबंधन",
        description:
          "मूल्य निर्धारण, खर्च, आय और लाभ का प्रबंधन करना सीखें।",
      },
      {
        icon: "🤝",
        title: "ग्राहक संवाद",
        description:
          "पेशेवर तरीके से उत्तर देना और ग्राहकों का विश्वास बनाना सीखें।",
      },
    ],
    comingSoon: "विस्तृत शिक्षण संसाधन जल्द ही जोड़े जाएंगे।",
  },
};

export default function Learn() {
  const { language } = useLanguage();
  const text = translations[language] || translations.EN;

  return (
    <>
      <Navbar />

      <main style={styles.page}>
        <header style={styles.header}>
          <p style={styles.label}>{text.label}</p>
          <h1 style={styles.title}>{text.title}</h1>
          <p style={styles.subtitle}>{text.subtitle}</p>
        </header>

        <section style={styles.grid}>
          {text.resources.map((resource) => (
            <article style={styles.card} key={resource.title}>
              <div style={styles.icon} aria-hidden="true">
                {resource.icon}
              </div>

              <h2 style={styles.cardTitle}>
                {resource.title}
              </h2>

              <p style={styles.description}>
                {resource.description}
              </p>
            </article>
          ))}
        </section>

        <p style={styles.comingSoon}>
          {text.comingSoon}
        </p>
      </main>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
    padding: "60px 20px 80px",
    backgroundColor: "#fff9f3",
  },

  header: {
    maxWidth: "900px",
    margin: "0 auto 45px",
    textAlign: "center",
  },

  label: {
    margin: "0 0 10px",
    color: "#4f8a6d",
    fontSize: "1.1rem",
    fontWeight: "700",
    letterSpacing: "1px",
    lineHeight: "1.5",
  },

  title: {
    margin: "0 0 16px",
    color: "#8e2857",
    fontSize: "clamp(2.4rem, 6vw, 4rem)",
    lineHeight: "1.2",
  },

  subtitle: {
    maxWidth: "720px",
    margin: "0 auto",
    color: "#5f555d",
    fontSize: "1.1rem",
    lineHeight: "1.7",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    maxWidth: "1150px",
    margin: "0 auto",
  },

  card: {
    padding: "30px 24px",
    backgroundColor: "#ffffff",
    border: "1px solid #eadce3",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(41, 37, 42, 0.07)",
    textAlign: "center",
  },

  icon: {
    marginBottom: "16px",
    fontSize: "2.5rem",
  },

  cardTitle: {
    margin: "0 0 12px",
    color: "#8e2857",
    fontSize: "1.35rem",
    lineHeight: "1.4",
  },

  description: {
    margin: "0",
    color: "#5f555d",
    lineHeight: "1.7",
  },

  comingSoon: {
    maxWidth: "700px",
    margin: "45px auto 0",
    padding: "18px",
    color: "#276c50",
    backgroundColor: "#e2f3eb",
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "1.6",
  },
};