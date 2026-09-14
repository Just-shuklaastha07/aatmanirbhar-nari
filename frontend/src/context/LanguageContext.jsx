import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

const translations = {
  EN: {
    navbar: {
      home: "Home",
      explore: "Explore Businesses",
      startBusiness: "Start Your Business",
      myBusiness: "My Business",
      myInquiries: "My Inquiries",
      customerInquiries: "Customer Inquiries",
      adminDashboard: "Admin Dashboard",
      learn: "Learn",
      about: "About",
      login: "Login",
      join: "Join as Entrepreneur",
      logout: "Logout",
      greeting: "Hi",
      english: "English",
      hindi: "हिन्दी",
    },

    landing: {
  heroLabel: "Empowering Women Entrepreneurs",
  heroTitle: "Turn Your Skills Into a Successful Home Business",
  tagline: "Ghar se shuruaat, sapno tak udaan",
  heroDescription:
    "Create your business profile, showcase your services and connect with customers near you.",
  locationPlaceholder: "Enter your city or locality",
  selectCategory: "Select category",
  search: "Search",
  startBusiness: "Start Your Business",
  exploreBusinesses: "Explore Businesses",
  heroAlt: "Indian woman managing her home business",

  categoriesLabel: "Discover local services",
  categoriesTitle: "Popular Categories",

  howLabel: "Simple and beginner-friendly",
  howTitle: "How It Works",

  featuredLabel: "Support local entrepreneurs",
  featuredTitle: "Featured Women-Led Businesses",
  viewAll: "View All Businesses",

  resourcesLabel: "Learn and grow",
  resourcesTitle: "Business Learning Resources",
  startLearning: "Start Learning",

  storyTitle: "Success Story",
  story:
    "Thanks to Aatmanirbhar Nari, I transformed my cooking skills into a thriving home business. Now I support my family and dream big!",
  storyAuthor: "— Priya Sharma, Uttar Pradesh",

  impactLabel: "Growing together",
  impactTitle: "Our Impact",
  womenEntrepreneurs: "Women Entrepreneurs",
  businessesCreated: "Businesses Created",
  customersReached: "Customers Reached",
  learningResources: "Learning Resources",

  ctaTitle: "Ready to Start Your Home Business?",
  ctaDescription:
    "Join the platform and take the first step towards financial independence.",
  join: "Join as Entrepreneur",

  categories: {
    handicrafts: "Handicrafts",
    tiffin: "Tiffin Services",
    tailoring: "Tailoring",
    tutoring: "Tutoring",
  },

  steps: {
    createTitle: "Create Profile",
    createDescription:
      "Sign up and create your home-business profile.",
    servicesTitle: "List Services",
    servicesDescription:
      "Showcase your products, prices and availability.",
    growTitle: "Connect & Grow",
    growDescription:
      "Receive inquiries and connect with local customers.",
  },

  resources: {
    startTitle: "How to Start a Business",
    startDescription:
      "Learn the basics of starting a home business.",
    marketingTitle: "Marketing Tips",
    marketingDescription:
      "Discover simple ways to grow your customer base.",
    financeTitle: "Managing Finances",
    financeDescription:
      "Learn how to track expenses, pricing and profit.",
  },
},
  },

  HI: {
    navbar: {
      home: "होम",
      explore: "व्यवसाय खोजें",
      startBusiness: "अपना व्यवसाय शुरू करें",
      myBusiness: "मेरा व्यवसाय",
      myInquiries: "मेरी पूछताछ",
      customerInquiries: "ग्राहक पूछताछ",
      adminDashboard: "एडमिन डैशबोर्ड",
      learn: "सीखें",
      about: "हमारे बारे में",
      login: "लॉग इन",
      join: "उद्यमी के रूप में जुड़ें",
      logout: "लॉग आउट",
      greeting: "नमस्ते",
      english: "English",
      hindi: "हिन्दी",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "EN";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language === "HI" ? "hi" : "en";
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (newLanguage === "EN" || newLanguage === "HI") {
      setLanguage(newLanguage);
    }
  };

  const translate = (key) => {
    const keys = key.split(".");

    const translatedValue = keys.reduce(
      (currentValue, currentKey) =>
        currentValue?.[currentKey],
      translations[language]
    );

    const englishFallback = keys.reduce(
      (currentValue, currentKey) =>
        currentValue?.[currentKey],
      translations.EN
    );

    return translatedValue || englishFallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t: translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider."
    );
  }

  return context;
}