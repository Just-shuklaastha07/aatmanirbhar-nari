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

    

auth: {
  role: {
    label: "JOIN OUR COMMUNITY",
    title: "How would you like to use the platform?",
    subtitle: "Select your role to create the correct account.",
    entrepreneur: "Woman Entrepreneur",
    entrepreneurDescription:
      "Create your business profile, showcase services and receive customer inquiries.",
    joinEntrepreneur: "Join as Entrepreneur",
    customer: "Customer",
    customerDescription:
      "Discover trusted women-led businesses and send service inquiries.",
    joinCustomer: "Join as Customer",
    alreadyRegistered: "Already registered?",
  },

  login: {
    label: "WELCOME BACK",
    title: "Log in to your account",
    subtitle:
      "Continue managing or discovering local businesses.",
    loginAs: "Login as",
    customer: "Customer",
    entrepreneur: "Entrepreneur",
    administrator: "Administrator",
    email: "Email address",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    remember: "Remember me",
    forgot: "Forgot password?",
    show: "Show",
    hide: "Hide",
    submit: "Log In",
    submitting: "Logging In...",
    success: "Logged in successfully!",
    noAccount: "Don’t have an account?",
    createAccount: "Create account",
  },

  register: {
  label: "CREATE YOUR ACCOUNT",
  entrepreneurTitle: "Register as Entrepreneur",
  customerTitle: "Register as Customer",
  subtitle: "Enter your details to begin your journey.",

  fullName: "Full name",
  fullNamePlaceholder: "Enter your full name",
  email: "Email address",
  mobile: "Mobile number",
  mobilePlaceholder: "10-digit mobile number",
  city: "City",
  cityPlaceholder: "Enter your city",
  preferredLanguage: "Preferred language",
  english: "English",
  hindi: "हिन्दी",
  password: "Password",
  passwordPlaceholder: "Minimum 8 characters",
  confirmPassword: "Confirm password",
  confirmPasswordPlaceholder: "Enter password again",
  show: "Show",
  hide: "Hide",
  agree: "I agree to the terms and privacy policy.",

  creating: "Creating Account...",
  createEntrepreneur: "Create Entrepreneur Account",
  createCustomer: "Create Customer Account",
  success: "Account created successfully!",
  failed: "Unable to create your account. Please try again.",

  alreadyAccount: "Already have an account?",
  login: "Log in",
  wrongRole: "Selected the wrong role?",
  changeRole: "Change role",

  fullNameRequired: "Full name is required.",
  fullNameLength: "Full name must contain at least 3 characters.",
  emailRequired: "Email address is required.",
  invalidEmail: "Enter a valid email address.",
  mobileRequired: "Mobile number is required.",
  invalidMobile: "Enter a valid 10-digit Indian mobile number.",
  cityRequired: "City is required.",
  passwordRequired: "Password is required.",
  passwordLength: "Password must contain at least 8 characters.",
  confirmRequired: "Please confirm your password.",
  passwordMismatch: "Passwords do not match.",
  termsRequired: "You must accept the terms and privacy policy.",
},

  forgot: {
    label: "ACCOUNT RECOVERY",
    title: "Forgot your password?",
    subtitle:
      "Enter your registered email address to request a reset link.",
    email: "Email address",
    submit: "Send Reset Link",
    remembered: "Remembered your password?",
    back: "Back to login",
    success:
      "Password reset request submitted. Email functionality will be connected later.",
  },

  validation: {
    emailRequired: "Email address is required.",
    invalidEmail: "Enter a valid email address.",
    passwordRequired: "Password is required.",
    roleRequired: "Please select your role.",
    loginFailed: "Unable to log in. Please check your details.",
  },

  common: {
    login: "Log in",
    emailPlaceholder: "name@example.com",
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

    auth: {
  role: {
    label: "हमारे समुदाय से जुड़ें",
    title: "आप इस प्लेटफ़ॉर्म का उपयोग कैसे करना चाहते हैं?",
    subtitle: "सही खाता बनाने के लिए अपनी भूमिका चुनें।",
    entrepreneur: "महिला उद्यमी",
    entrepreneurDescription:
      "अपनी व्यवसाय प्रोफ़ाइल बनाएं, सेवाएं प्रदर्शित करें और ग्राहकों की पूछताछ प्राप्त करें।",
    joinEntrepreneur: "उद्यमी के रूप में जुड़ें",
    customer: "ग्राहक",
    customerDescription:
      "विश्वसनीय महिला-संचालित व्यवसाय खोजें और सेवाओं के लिए पूछताछ भेजें।",
    joinCustomer: "ग्राहक के रूप में जुड़ें",
    alreadyRegistered: "पहले से पंजीकृत हैं?",
  },

  register: {
  label: "अपना खाता बनाएं",
  entrepreneurTitle: "उद्यमी के रूप में पंजीकरण करें",
  customerTitle: "ग्राहक के रूप में पंजीकरण करें",
  subtitle: "अपनी यात्रा शुरू करने के लिए अपनी जानकारी दर्ज करें।",

  fullName: "पूरा नाम",
  fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
  email: "ईमेल पता",
  mobile: "मोबाइल नंबर",
  mobilePlaceholder: "10 अंकों का मोबाइल नंबर",
  city: "शहर",
  cityPlaceholder: "अपना शहर दर्ज करें",
  preferredLanguage: "पसंदीदा भाषा",
  english: "English",
  hindi: "हिन्दी",
  password: "पासवर्ड",
  passwordPlaceholder: "कम से कम 8 अक्षर",
  confirmPassword: "पासवर्ड की पुष्टि करें",
  confirmPasswordPlaceholder: "पासवर्ड दोबारा दर्ज करें",
  show: "दिखाएं",
  hide: "छिपाएं",
  agree: "मैं नियमों और गोपनीयता नीति से सहमत हूं।",

  creating: "खाता बनाया जा रहा है...",
  createEntrepreneur: "उद्यमी खाता बनाएं",
  createCustomer: "ग्राहक खाता बनाएं",
  success: "खाता सफलतापूर्वक बन गया!",
  failed: "खाता नहीं बनाया जा सका। कृपया दोबारा प्रयास करें।",

  alreadyAccount: "क्या आपका खाता पहले से है?",
  login: "लॉग इन करें",
  wrongRole: "क्या आपने गलत भूमिका चुनी है?",
  changeRole: "भूमिका बदलें",

  fullNameRequired: "पूरा नाम आवश्यक है।",
  fullNameLength: "पूरे नाम में कम से कम 3 अक्षर होने चाहिए।",
  emailRequired: "ईमेल पता आवश्यक है।",
  invalidEmail: "एक मान्य ईमेल पता दर्ज करें।",
  mobileRequired: "मोबाइल नंबर आवश्यक है।",
  invalidMobile: "एक मान्य 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।",
  cityRequired: "शहर आवश्यक है।",
  passwordRequired: "पासवर्ड आवश्यक है।",
  passwordLength: "पासवर्ड में कम से कम 8 अक्षर होने चाहिए।",
  confirmRequired: "कृपया अपने पासवर्ड की पुष्टि करें।",
  passwordMismatch: "पासवर्ड मेल नहीं खाते।",
  termsRequired: "आपको नियमों और गोपनीयता नीति को स्वीकार करना होगा।",
},

  login: {
    label: "आपका फिर से स्वागत है",
    title: "अपने खाते में लॉग इन करें",
    subtitle:
      "स्थानीय व्यवसायों को खोजना या प्रबंधित करना जारी रखें।",
    loginAs: "इस रूप में लॉग इन करें",
    customer: "ग्राहक",
    entrepreneur: "उद्यमी",
    administrator: "प्रशासक",
    email: "ईमेल पता",
    password: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    remember: "मुझे याद रखें",
    forgot: "पासवर्ड भूल गए?",
    show: "दिखाएं",
    hide: "छिपाएं",
    submit: "लॉग इन करें",
    submitting: "लॉग इन हो रहा है...",
    success: "सफलतापूर्वक लॉग इन हो गया!",
    noAccount: "आपका खाता नहीं है?",
    createAccount: "खाता बनाएं",
  },

  forgot: {
    label: "खाता पुनर्प्राप्ति",
    title: "अपना पासवर्ड भूल गए?",
    subtitle:
      "रीसेट लिंक का अनुरोध करने के लिए अपना पंजीकृत ईमेल पता दर्ज करें।",
    email: "ईमेल पता",
    submit: "रीसेट लिंक भेजें",
    remembered: "पासवर्ड याद आ गया?",
    back: "लॉग इन पर वापस जाएं",
    success:
      "पासवर्ड रीसेट अनुरोध भेज दिया गया है। ईमेल सुविधा बाद में जोड़ी जाएगी।",
  },

  validation: {
    emailRequired: "ईमेल पता आवश्यक है।",
    invalidEmail: "एक मान्य ईमेल पता दर्ज करें।",
    passwordRequired: "पासवर्ड आवश्यक है।",
    roleRequired: "कृपया अपनी भूमिका चुनें।",
    loginFailed:
      "लॉग इन नहीं हो सका। कृपया अपनी जानकारी जांचें।",
  },

  common: {
    login: "लॉग इन करें",
    emailPlaceholder: "name@example.com",
  },
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