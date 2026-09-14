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
  heroLabel: "महिला उद्यमियों को सशक्त बनाना",
  heroTitle: "अपने कौशल को सफल घरेलू व्यवसाय में बदलें",
  tagline: "घर से शुरुआत, सपनों तक उड़ान",
  heroDescription:
    "अपनी व्यवसाय प्रोफ़ाइल बनाएं, अपनी सेवाएं दिखाएं और आस-पास के ग्राहकों से जुड़ें।",
  locationPlaceholder: "अपना शहर या क्षेत्र दर्ज करें",
  selectCategory: "श्रेणी चुनें",
  search: "खोजें",
  startBusiness: "अपना व्यवसाय शुरू करें",
  exploreBusinesses: "व्यवसाय खोजें",
  heroAlt: "अपना घरेलू व्यवसाय संभालती भारतीय महिला",

  categoriesLabel: "स्थानीय सेवाएं खोजें",
  categoriesTitle: "लोकप्रिय श्रेणियां",

  howLabel: "सरल और शुरुआती लोगों के लिए उपयोगी",
  howTitle: "यह कैसे काम करता है",

  featuredLabel: "स्थानीय उद्यमियों का समर्थन करें",
  featuredTitle: "महिलाओं द्वारा संचालित विशेष व्यवसाय",
  viewAll: "सभी व्यवसाय देखें",

  resourcesLabel: "सीखें और आगे बढ़ें",
  resourcesTitle: "व्यवसाय सीखने के संसाधन",
  startLearning: "सीखना शुरू करें",

  storyTitle: "सफलता की कहानी",
  story:
    "आत्मनिर्भर नारी की सहायता से मैंने अपने खाना बनाने के कौशल को एक सफल घरेलू व्यवसाय में बदल दिया। अब मैं अपने परिवार का सहयोग करती हूं और बड़े सपने देखती हूं!",
  storyAuthor: "— प्रिया शर्मा, उत्तर प्रदेश",

  impactLabel: "साथ मिलकर आगे बढ़ना",
  impactTitle: "हमारा प्रभाव",
  womenEntrepreneurs: "महिला उद्यमी",
  businessesCreated: "बनाए गए व्यवसाय",
  customersReached: "जुड़े हुए ग्राहक",
  learningResources: "सीखने के संसाधन",

  ctaTitle: "क्या आप अपना घरेलू व्यवसाय शुरू करने के लिए तैयार हैं?",
  ctaDescription:
    "प्लेटफ़ॉर्म से जुड़ें और आर्थिक स्वतंत्रता की दिशा में पहला कदम उठाएं।",
  join: "उद्यमी के रूप में जुड़ें",

  categories: {
    handicrafts: "हस्तशिल्प",
    tiffin: "टिफिन सेवाएं",
    tailoring: "सिलाई",
    tutoring: "शिक्षण",
  },

  steps: {
    createTitle: "प्रोफ़ाइल बनाएं",
    createDescription:
      "पंजीकरण करें और अपनी घरेलू व्यवसाय प्रोफ़ाइल बनाएं।",
    servicesTitle: "सेवाएं सूचीबद्ध करें",
    servicesDescription:
      "अपने उत्पाद, कीमतें और उपलब्धता प्रदर्शित करें।",
    growTitle: "जुड़ें और आगे बढ़ें",
    growDescription:
      "पूछताछ प्राप्त करें और स्थानीय ग्राहकों से जुड़ें।",
  },

  resources: {
    startTitle: "व्यवसाय कैसे शुरू करें",
    startDescription:
      "घरेलू व्यवसाय शुरू करने की बुनियादी बातें सीखें।",
    marketingTitle: "मार्केटिंग सुझाव",
    marketingDescription:
      "अपने ग्राहक आधार को बढ़ाने के आसान तरीके जानें।",
    financeTitle: "वित्त प्रबंधन",
    financeDescription:
      "खर्च, मूल्य निर्धारण और लाभ का हिसाब रखना सीखें।",
  },
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
   footer: {
  tagline: "Ghar se shuruaat, sapno tak udaan",
  home: "Home",
  explore: "Explore",
  startBusiness: "Start Business",
  learn: "Learn",
  about: "About",
  copyright: "© 2026 Aatmanirbhar Nari. All rights reserved.",
},

explore: {
  label: "DISCOVER LOCAL TALENT",
  title: "Explore Women-led Businesses",
  description:
    "Find trusted products and services offered by women entrepreneurs near you.",
  searchPlaceholder: "Search businesses or services",
  cityPlaceholder: "Enter city",
  allCategories: "All categories",
  search: "Search",
  clear: "Clear",
  loading: "Loading businesses...",
  noBusinesses: "No businesses found",
  changeFilters: "Try changing your search or filters.",
  approved: "approved",
  business: "business",
  businesses: "businesses",
  found: "found",
  by: "By",
  localEntrepreneur: "Local entrepreneur",
  services: "Services",
  from: "From",
  noServices: "No services listed.",
  sendInquiry: "Send Inquiry",
  whatsapp: "Contact on WhatsApp",
  contactUnavailable: "Contact unavailable",

  categories: {
    tiffin: "Tiffin Services",
    tailoring: "Tailoring",
    beauty: "Beauty Services",
    handicrafts: "Handicrafts",
    bakery: "Home Bakery",
    tutoring: "Tutoring",
    other: "Other",
  },
},

inquiry: {
  label: "CUSTOMER INQUIRY",
  contact: "Contact",
  close: "Close inquiry form",
  subject: "Subject",
  subjectPlaceholder: "For example: Custom order request",
  message: "Message",
  messagePlaceholder: "Describe the product or service you need",
  send: "Send Inquiry",
  sending: "Sending...",
  customerOnly: "Only customer accounts can send inquiries.",
  invalidSubject: "Subject must contain at least 3 characters.",
  invalidMessage: "Message must contain at least 10 characters.",
  success: "Your inquiry was sent successfully.",
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
    footer: {
  tagline: "घर से शुरुआत, सपनों तक उड़ान",
  home: "होम",
  explore: "व्यवसाय खोजें",
  startBusiness: "व्यवसाय शुरू करें",
  learn: "सीखें",
  about: "हमारे बारे में",
  copyright: "© 2026 आत्मनिर्भर नारी। सर्वाधिकार सुरक्षित।",
},

explore: {
  label: "स्थानीय प्रतिभा खोजें",
  title: "महिलाओं द्वारा संचालित व्यवसाय खोजें",
  description:
    "अपने आस-पास महिला उद्यमियों द्वारा प्रदान किए जाने वाले विश्वसनीय उत्पाद और सेवाएं खोजें।",
  searchPlaceholder: "व्यवसाय या सेवाएं खोजें",
  cityPlaceholder: "शहर दर्ज करें",
  allCategories: "सभी श्रेणियां",
  search: "खोजें",
  clear: "हटाएं",
  loading: "व्यवसाय लोड हो रहे हैं...",
  noBusinesses: "कोई व्यवसाय नहीं मिला",
  changeFilters: "अपनी खोज या फ़िल्टर बदलकर देखें।",
  approved: "स्वीकृत",
  business: "व्यवसाय",
  businesses: "व्यवसाय",
  found: "मिले",
  by: "संचालक",
  localEntrepreneur: "स्थानीय उद्यमी",
  services: "सेवाएं",
  from: "शुरुआत",
  noServices: "कोई सेवा सूचीबद्ध नहीं है।",
  sendInquiry: "पूछताछ भेजें",
  whatsapp: "व्हाट्सऐप पर संपर्क करें",
  contactUnavailable: "संपर्क उपलब्ध नहीं है",

  categories: {
    tiffin: "टिफिन सेवाएं",
    tailoring: "सिलाई",
    beauty: "सौंदर्य सेवाएं",
    handicrafts: "हस्तशिल्प",
    bakery: "घरेलू बेकरी",
    tutoring: "शिक्षण",
    other: "अन्य",
  },
},

inquiry: {
  label: "ग्राहक पूछताछ",
  contact: "संपर्क करें",
  close: "पूछताछ फॉर्म बंद करें",
  subject: "विषय",
  subjectPlaceholder: "उदाहरण: विशेष ऑर्डर का अनुरोध",
  message: "संदेश",
  messagePlaceholder: "आपको जिस उत्पाद या सेवा की आवश्यकता है उसका विवरण दें",
  send: "पूछताछ भेजें",
  sending: "भेजा जा रहा है...",
  customerOnly: "केवल ग्राहक खाते पूछताछ भेज सकते हैं।",
  invalidSubject: "विषय में कम से कम 3 अक्षर होने चाहिए।",
  invalidMessage: "संदेश में कम से कम 10 अक्षर होने चाहिए।",
  success: "आपकी पूछताछ सफलतापूर्वक भेज दी गई है।",
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