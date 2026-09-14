import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  EN: {
    label: "ABOUT THE PLATFORM",
    title: "About Aatmanirbhar Nari",
    introduction:
      "Aatmanirbhar Nari is a digital platform designed to support women who run or want to start home-based businesses.",
    missionTitle: "Our Mission",
    mission:
      "Our mission is to help women entrepreneurs showcase their skills, connect with local customers and move towards financial independence.",
    featuresTitle: "What the Platform Provides",
    features: [
      "Secure role-based registration and login",
      "Business profile creation and management",
      "Business discovery using search and filters",
      "Direct customer inquiry system",
      "Admin verification and business approval",
      "English and Hindi language support",
    ],
    technologyTitle: "Technology Used",
    technology:
      "The platform is developed using React.js, Node.js, Express.js, MongoDB, JWT authentication and responsive CSS.",
  },

  HI: {
    label: "प्लेटफ़ॉर्म के बारे में",
    title: "आत्मनिर्भर नारी के बारे में",
    introduction:
      "आत्मनिर्भर नारी एक डिजिटल प्लेटफ़ॉर्म है, जिसे घरेलू व्यवसाय चलाने या शुरू करने वाली महिलाओं की सहायता के लिए बनाया गया है।",
    missionTitle: "हमारा उद्देश्य",
    mission:
      "हमारा उद्देश्य महिला उद्यमियों को अपने कौशल और सेवाएं प्रदर्शित करने, स्थानीय ग्राहकों से जुड़ने और आर्थिक आत्मनिर्भरता की ओर बढ़ने में सहायता करना है।",
    featuresTitle: "प्लेटफ़ॉर्म की सुविधाएं",
    features: [
      "सुरक्षित भूमिका-आधारित पंजीकरण और लॉग इन",
      "व्यवसाय प्रोफ़ाइल बनाना और प्रबंधित करना",
      "खोज और फ़िल्टर द्वारा व्यवसाय ढूंढना",
      "ग्राहकों के लिए सीधी पूछताछ सुविधा",
      "एडमिन द्वारा व्यवसाय की जांच और स्वीकृति",
      "अंग्रेजी और हिन्दी भाषा का समर्थन",
    ],
    technologyTitle: "उपयोग की गई तकनीक",
    technology:
      "यह प्लेटफ़ॉर्म React.js, Node.js, Express.js, MongoDB, JWT Authentication और Responsive CSS का उपयोग करके बनाया गया है।",
  },
};

export default function About() {
  const { language } = useLanguage();
  const text = translations[language] || translations.EN;

  return (
    <>
      <Navbar />

      <main style={styles.page}>
        <header style={styles.header}>
          <p style={styles.label}>{text.label}</p>
          <h1 style={styles.title}>{text.title}</h1>
          <p style={styles.introduction}>
            {text.introduction}
          </p>
        </header>

        <section style={styles.content}>
          <article style={styles.card}>
            <h2 style={styles.cardTitle}>
              {text.missionTitle}
            </h2>

            <p style={styles.paragraph}>{text.mission}</p>
          </article>

          <article style={styles.card}>
            <h2 style={styles.cardTitle}>
              {text.featuresTitle}
            </h2>

            <ul style={styles.list}>
              {text.features.map((feature) => (
                <li style={styles.listItem} key={feature}>
                  <span style={styles.check}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>

          <article style={styles.card}>
            <h2 style={styles.cardTitle}>
              {text.technologyTitle}
            </h2>

            <p style={styles.paragraph}>
              {text.technology}
            </p>
          </article>
        </section>
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
    margin: "0 0 18px",
    color: "#8e2857",
    fontSize: "clamp(2.4rem, 6vw, 4rem)",
    lineHeight: "1.2",
  },

  introduction: {
    maxWidth: "760px",
    margin: "0 auto",
    color: "#5f555d",
    fontSize: "1.1rem",
    lineHeight: "1.8",
  },

  content: {
    display: "grid",
    gap: "24px",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  card: {
    padding: "30px",
    backgroundColor: "#ffffff",
    border: "1px solid #eadce3",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(41, 37, 42, 0.07)",
  },

  cardTitle: {
    margin: "0 0 15px",
    color: "#8e2857",
    fontSize: "1.5rem",
    lineHeight: "1.4",
  },

  paragraph: {
    margin: "0",
    color: "#5f555d",
    lineHeight: "1.8",
  },

  list: {
    display: "grid",
    gap: "14px",
    margin: "0",
    padding: "0",
    listStyle: "none",
  },

  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    color: "#5f555d",
    lineHeight: "1.6",
  },

  check: {
    flexShrink: "0",
    color: "#4f8a6d",
    fontWeight: "700",
  },
};