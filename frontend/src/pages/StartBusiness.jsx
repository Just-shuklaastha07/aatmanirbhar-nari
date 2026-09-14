import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

import {
  createBusinessProfile,
  getMyBusinessProfile,
  submitBusinessProfile,
  updateBusinessProfile,
} from "../services/businessService";

import "./StartBusiness.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const categories = [
  "Tiffin Services",
  "Tailoring",
  "Beauty Services",
  "Handicrafts",
  "Home Bakery",
  "Tutoring",
  "Other",
];

const initialForm = {
  businessName: "",
  category: "",
  description: "",
  experience: "",
  address: "",
  locality: "",
  city: "",
  pinCode: "",
  serviceAreas: "",
  serviceName: "",
  serviceDescription: "",
  startingPrice: "",
  minimumPrice: "",
  maximumPrice: "",
  workingDays: [],
  openingTime: "",
  closingTime: "",
  homeDelivery: false,
  whatsappNumber: "",
};

const translations = {
  EN: {
    loading: "Loading your business profile...",
    onboarding: "Entrepreneur onboarding",
    title: "Create Your Business Profile",
    subtitle:
      "Add your business details so customers can discover your services.",
    profileComplete: "Profile complete",

    status: {
      draft: "Draft",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },

    steps: [
      "Business",
      "Location",
      "Services",
      "Availability",
      "Preview",
    ],

    businessDetails: "Business Details",
    businessName: "Business name",
    businessNamePlaceholder: "Example: Anita's Tiffin Service",
    businessCategory: "Business category",
    selectCategory: "Select category",
    experience: "Experience in years",
    businessDescription: "Business description",
    businessDescriptionPlaceholder:
      "Describe your business and what makes it special",

    businessLocation: "Business Location",
    address: "Address",
    locality: "Locality",
    city: "City",
    pinCode: "PIN code",
    serviceAreas: "Service areas",
    serviceAreasPlaceholder: "Ghaziabad, Noida, Delhi",

    servicesPricing: "Services and Pricing",
    serviceName: "Service name",
    startingPrice: "Starting price",
    serviceDescription: "Service description",
    minimumPrice: "Minimum price",
    maximumPrice: "Maximum price",

    availability: "Availability",
    workingDays: "Working days",
    openingTime: "Opening time",
    closingTime: "Closing time",
    whatsappNumber: "WhatsApp number",
    homeDeliveryAvailable: "Home delivery available",

    previewProfile: "Preview Your Profile",
    businessNameFallback: "Business name",
    location: "Location",
    service: "Service",
    homeDelivery: "Home delivery",
    yes: "Yes",
    no: "No",

    back: "Back",
    saveDraft: "Save Draft",
    saving: "Saving...",
    next: "Next",
    awaitingApproval: "Awaiting Approval",
    submitApproval: "Submit for Approval",

    savedMessage: "Business profile saved as draft.",
    submittedMessage:
      "Profile submitted successfully for admin approval.",

    errors: {
      business:
        "Complete all required business details.",
      location:
        "Enter a locality, city and valid 6-digit PIN code.",
      locationShort:
        "Complete the location information.",
      service:
        "Enter at least one service and its starting price.",
      serviceShort:
        "Add at least one service and starting price.",
      price:
        "Maximum price must be greater than or equal to minimum price.",
      availability:
        "Select working days and business timings.",
      availabilityShort:
        "Complete your availability information.",
      whatsapp:
        "Enter a valid 10-digit WhatsApp number.",
    },
  },

  HI: {
    loading: "आपकी व्यवसाय प्रोफ़ाइल लोड हो रही है...",
    onboarding: "उद्यमी पंजीकरण",
    title: "अपनी व्यवसाय प्रोफ़ाइल बनाएं",
    subtitle:
      "अपने व्यवसाय की जानकारी जोड़ें ताकि ग्राहक आपकी सेवाएं खोज सकें।",
    profileComplete: "प्रोफ़ाइल पूर्ण",

    status: {
      draft: "ड्राफ्ट",
      pending: "लंबित",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत",
    },

    steps: [
      "व्यवसाय",
      "स्थान",
      "सेवाएं",
      "उपलब्धता",
      "पूर्वावलोकन",
    ],

    businessDetails: "व्यवसाय की जानकारी",
    businessName: "व्यवसाय का नाम",
    businessNamePlaceholder: "उदाहरण: अनीता टिफिन सर्विस",
    businessCategory: "व्यवसाय की श्रेणी",
    selectCategory: "श्रेणी चुनें",
    experience: "वर्षों का अनुभव",
    businessDescription: "व्यवसाय का विवरण",
    businessDescriptionPlaceholder:
      "अपने व्यवसाय और उसकी विशेषताओं का वर्णन करें",

    businessLocation: "व्यवसाय का स्थान",
    address: "पता",
    locality: "इलाका",
    city: "शहर",
    pinCode: "पिन कोड",
    serviceAreas: "सेवा क्षेत्र",
    serviceAreasPlaceholder: "गाजियाबाद, नोएडा, दिल्ली",

    servicesPricing: "सेवाएं और मूल्य",
    serviceName: "सेवा का नाम",
    startingPrice: "शुरुआती मूल्य",
    serviceDescription: "सेवा का विवरण",
    minimumPrice: "न्यूनतम मूल्य",
    maximumPrice: "अधिकतम मूल्य",

    availability: "उपलब्धता",
    workingDays: "कार्य दिवस",
    openingTime: "खुलने का समय",
    closingTime: "बंद होने का समय",
    whatsappNumber: "व्हाट्सऐप नंबर",
    homeDeliveryAvailable: "होम डिलीवरी उपलब्ध है",

    previewProfile: "अपनी प्रोफ़ाइल का पूर्वावलोकन करें",
    businessNameFallback: "व्यवसाय का नाम",
    location: "स्थान",
    service: "सेवा",
    homeDelivery: "होम डिलीवरी",
    yes: "हाँ",
    no: "नहीं",

    back: "पीछे",
    saveDraft: "ड्राफ्ट सहेजें",
    saving: "सहेजा जा रहा है...",
    next: "आगे",
    awaitingApproval: "स्वीकृति की प्रतीक्षा",
    submitApproval: "स्वीकृति के लिए भेजें",

    savedMessage: "व्यवसाय प्रोफ़ाइल ड्राफ्ट के रूप में सहेजी गई।",
    submittedMessage:
      "प्रोफ़ाइल सफलतापूर्वक एडमिन की स्वीकृति के लिए भेजी गई।",

    errors: {
      business:
        "व्यवसाय की सभी आवश्यक जानकारी पूरी करें।",
      location:
        "इलाका, शहर और मान्य 6 अंकों का पिन कोड दर्ज करें।",
      locationShort:
        "स्थान की पूरी जानकारी दर्ज करें।",
      service:
        "कम से कम एक सेवा और उसका शुरुआती मूल्य दर्ज करें।",
      serviceShort:
        "कम से कम एक सेवा और शुरुआती मूल्य जोड़ें।",
      price:
        "अधिकतम मूल्य न्यूनतम मूल्य के बराबर या उससे अधिक होना चाहिए।",
      availability:
        "कार्य दिवस और व्यवसाय का समय चुनें।",
      availabilityShort:
        "उपलब्धता की पूरी जानकारी दर्ज करें।",
      whatsapp:
        "मान्य 10 अंकों का व्हाट्सऐप नंबर दर्ज करें।",
    },
  },
};

const dayTranslations = {
  Monday: "सोमवार",
  Tuesday: "मंगलवार",
  Wednesday: "बुधवार",
  Thursday: "गुरुवार",
  Friday: "शुक्रवार",
  Saturday: "शनिवार",
  Sunday: "रविवार",
};

const categoryTranslations = {
  "Tiffin Services": "टिफिन सेवाएं",
  Tailoring: "सिलाई",
  "Beauty Services": "सौंदर्य सेवाएं",
  Handicrafts: "हस्तशिल्प",
  "Home Bakery": "होम बेकरी",
  Tutoring: "शिक्षण",
  Other: "अन्य",
};

export default function StartBusiness() {
  const { token } = useAuth();
  const { language } = useLanguage();

  const text = translations[language] || translations.EN;

  const displayDay = (day) =>
    language === "HI" ? dayTranslations[day] || day : day;

  const displayCategory = (category) =>
    language === "HI"
      ? categoryTranslations[category] || category
      : category;

  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [profileExists, setProfileExists] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("draft");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [messageKey, setMessageKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyBusinessProfile(token);
        const profile = data.profile;

        setProfileExists(true);
        setApprovalStatus(profile.approvalStatus);
        setProfileCompletion(profile.profileCompletion);

        setForm({
          businessName: profile.businessName || "",
          category: profile.category || "",
          description: profile.description || "",
          experience: profile.experience ?? "",
          address: profile.address || "",
          locality: profile.locality || "",
          city: profile.city || "",
          pinCode: profile.pinCode || "",
          serviceAreas: profile.serviceAreas?.join(", ") || "",
          serviceName: profile.services?.[0]?.name || "",
          serviceDescription:
            profile.services?.[0]?.description || "",
          startingPrice:
            profile.services?.[0]?.startingPrice ?? "",
          minimumPrice: profile.minimumPrice ?? "",
          maximumPrice: profile.maximumPrice ?? "",
          workingDays: profile.workingDays || [],
          openingTime: profile.openingTime || "",
          closingTime: profile.closingTime || "",
          homeDelivery: profile.homeDelivery || false,
          whatsappNumber: profile.whatsappNumber || "",
        });
      } catch (requestError) {
        if (requestError.status !== 404) {
          setError(requestError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setMessageKey("");
  };

  const handleDayChange = (day) => {
    setForm((previous) => ({
      ...previous,
      workingDays: previous.workingDays.includes(day)
        ? previous.workingDays.filter((item) => item !== day)
        : [...previous.workingDays, day],
    }));

    setError("");
    setMessageKey("");
  };

  const validateStep = (stepNumber) => {
    if (
      stepNumber === 1 &&
      (!form.businessName.trim() ||
        !form.category ||
        !form.description.trim())
    ) {
      return text.errors.business;
    }

    if (
      stepNumber === 2 &&
      (!form.locality.trim() ||
        !form.city.trim() ||
        !/^[1-9][0-9]{5}$/.test(form.pinCode.trim()))
    ) {
      return text.errors.location;
    }

    if (
      stepNumber === 3 &&
      (!form.serviceName.trim() ||
        form.startingPrice === "")
    ) {
      return text.errors.service;
    }

    if (
      stepNumber === 3 &&
      Number(form.maximumPrice) > 0 &&
      Number(form.minimumPrice) > Number(form.maximumPrice)
    ) {
      return text.errors.price;
    }

    if (
      stepNumber === 4 &&
      (form.workingDays.length === 0 ||
        !form.openingTime ||
        !form.closingTime)
    ) {
      return text.errors.availability;
    }

    if (
      stepNumber === 4 &&
      form.whatsappNumber &&
      !/^[6-9]\d{9}$/.test(form.whatsappNumber.trim())
    ) {
      return text.errors.whatsapp;
    }

    return "";
  };

  const nextStep = () => {
    const validationError = validateStep(step);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setMessageKey("");
    setStep((previous) => Math.min(previous + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setError("");
    setMessageKey("");
    setStep((previous) => Math.max(previous - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prepareProfileData = () => ({
    businessName: form.businessName.trim(),
    category: form.category,
    description: form.description.trim(),
    experience: Number(form.experience) || 0,
    address: form.address.trim(),
    locality: form.locality.trim(),
    city: form.city.trim(),
    pinCode: form.pinCode.trim(),

    serviceAreas: form.serviceAreas
      .split(",")
      .map((area) => area.trim())
      .filter(Boolean),

    services: form.serviceName.trim()
      ? [
          {
            name: form.serviceName.trim(),
            description: form.serviceDescription.trim(),
            startingPrice: Number(form.startingPrice),
          },
        ]
      : [],

    minimumPrice: Number(form.minimumPrice) || 0,
    maximumPrice: Number(form.maximumPrice) || 0,
    workingDays: form.workingDays,
    openingTime: form.openingTime,
    closingTime: form.closingTime,
    homeDelivery: form.homeDelivery,
    whatsappNumber: form.whatsappNumber.trim(),
  });

  const saveDraft = async () => {
    try {
      setSaving(true);
      setError("");
      setMessageKey("");

      const profileData = prepareProfileData();

      const data = profileExists
        ? await updateBusinessProfile(profileData, token)
        : await createBusinessProfile(profileData, token);

      setProfileExists(true);
      setApprovalStatus(data.profile.approvalStatus);
      setProfileCompletion(data.profile.profileCompletion);
      setMessageKey("saved");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const submitProfile = async () => {
    for (let currentStep = 1; currentStep <= 4; currentStep++) {
      const validationError = validateStep(currentStep);

      if (validationError) {
        setStep(currentStep);
        setError(validationError);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    try {
      setSaving(true);
      setError("");
      setMessageKey("");

      const profileData = prepareProfileData();

      if (profileExists) {
        await updateBusinessProfile(profileData, token);
      } else {
        await createBusinessProfile(profileData, token);
        setProfileExists(true);
      }

      const data = await submitBusinessProfile(token);

      setApprovalStatus(data.profile.approvalStatus);
      setProfileCompletion(data.profile.profileCompletion);
      setMessageKey("submitted");
      setStep(5);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="business-loading">
          {text.loading}
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="business-onboarding">
        <section className="business-form-card">
          <div className="business-form-header">
            <div>
              <p className="business-label">
                {text.onboarding}
              </p>

              <h1>{text.title}</h1>

              <p>{text.subtitle}</p>
            </div>

            <div className="profile-summary">
              <strong>{profileCompletion}%</strong>
              <span>{text.profileComplete}</span>

              <span
                className={`status-badge ${approvalStatus}`}
              >
                {text.status[approvalStatus] || approvalStatus}
              </span>
            </div>
          </div>

          <div className="step-progress">
            {[1, 2, 3, 4, 5].map((number) => (
              <div
                key={number}
                className={`progress-step ${
                  step >= number ? "active" : ""
                }`}
              >
                <span>{number}</span>
                <small>{text.steps[number - 1]}</small>
              </div>
            ))}
          </div>

          {messageKey && (
            <div className="business-success" role="status">
              {messageKey === "saved"
                ? text.savedMessage
                : text.submittedMessage}
            </div>
          )}

          {error && (
            <div className="business-error" role="alert">
              {error}
            </div>
          )}

          {step === 1 && (
            <section className="form-step">
              <h2>{text.businessDetails}</h2>

              <div className="business-form-grid">
                <label>
                  {text.businessName} *
                  <input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder={text.businessNamePlaceholder}
                  />
                </label>

                <label>
                  {text.businessCategory} *
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">
                      {text.selectCategory}
                    </option>

                    {categories.map((category) => (
                      <option value={category} key={category}>
                        {displayCategory(category)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  {text.experience}
                  <input
                    type="number"
                    min="0"
                    max="60"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                  />
                </label>

                <label className="full-field">
                  {text.businessDescription} *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder={
                      text.businessDescriptionPlaceholder
                    }
                  />
                </label>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="form-step">
              <h2>{text.businessLocation}</h2>

              <div className="business-form-grid">
                <label className="full-field">
                  {text.address}
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.locality} *
                  <input
                    name="locality"
                    value={form.locality}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.city} *
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.pinCode} *
                  <input
                    name="pinCode"
                    value={form.pinCode}
                    onChange={handleChange}
                    maxLength="6"
                    inputMode="numeric"
                  />
                </label>

                <label>
                  {text.serviceAreas}
                  <input
                    name="serviceAreas"
                    value={form.serviceAreas}
                    onChange={handleChange}
                    placeholder={text.serviceAreasPlaceholder}
                  />
                </label>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="form-step">
              <h2>{text.servicesPricing}</h2>

              <div className="business-form-grid">
                <label>
                  {text.serviceName} *
                  <input
                    name="serviceName"
                    value={form.serviceName}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.startingPrice} *
                  <input
                    type="number"
                    min="0"
                    name="startingPrice"
                    value={form.startingPrice}
                    onChange={handleChange}
                  />
                </label>

                <label className="full-field">
                  {text.serviceDescription}
                  <textarea
                    name="serviceDescription"
                    value={form.serviceDescription}
                    onChange={handleChange}
                    rows="4"
                  />
                </label>

                <label>
                  {text.minimumPrice}
                  <input
                    type="number"
                    min="0"
                    name="minimumPrice"
                    value={form.minimumPrice}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.maximumPrice}
                  <input
                    type="number"
                    min="0"
                    name="maximumPrice"
                    value={form.maximumPrice}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="form-step">
              <h2>{text.availability}</h2>

              <p className="field-heading">
                {text.workingDays} *
              </p>

              <div className="days-grid">
                {days.map((day) => (
                  <label key={day} className="day-option">
                    <input
                      type="checkbox"
                      checked={form.workingDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />

                    {displayDay(day)}
                  </label>
                ))}
              </div>

              <div className="business-form-grid availability-grid">
                <label>
                  {text.openingTime} *
                  <input
                    type="time"
                    name="openingTime"
                    value={form.openingTime}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.closingTime} *
                  <input
                    type="time"
                    name="closingTime"
                    value={form.closingTime}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  {text.whatsappNumber}
                  <input
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    maxLength="10"
                    inputMode="numeric"
                  />
                </label>

                <label className="delivery-option">
                  <input
                    type="checkbox"
                    name="homeDelivery"
                    checked={form.homeDelivery}
                    onChange={handleChange}
                  />

                  {text.homeDeliveryAvailable}
                </label>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="form-step">
              <h2>{text.previewProfile}</h2>

              <div className="profile-preview">
                <h3>
                  {form.businessName ||
                    text.businessNameFallback}
                </h3>

                <p>{displayCategory(form.category)}</p>
                <p>{form.description}</p>

                <dl>
                  <div>
                    <dt>{text.location}</dt>
                    <dd>
                      {form.locality}, {form.city} –{" "}
                      {form.pinCode}
                    </dd>
                  </div>

                  <div>
                    <dt>{text.service}</dt>
                    <dd>
                      {form.serviceName} — ₹
                      {form.startingPrice}
                    </dd>
                  </div>

                  <div>
                    <dt>{text.availability}</dt>
                    <dd>
                      {form.workingDays
                        .map(displayDay)
                        .join(", ")}

                      <br />

                      {form.openingTime} – {form.closingTime}
                    </dd>
                  </div>

                  <div>
                    <dt>{text.homeDelivery}</dt>
                    <dd>
                      {form.homeDelivery
                        ? text.yes
                        : text.no}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button
                type="button"
                className="previous-button"
                onClick={previousStep}
                disabled={saving}
              >
                {text.back}
              </button>
            )}

            <button
              type="button"
              className="draft-button"
              onClick={saveDraft}
              disabled={saving}
            >
              {saving ? text.saving : text.saveDraft}
            </button>

            {step < 5 ? (
              <button
                type="button"
                className="next-button"
                onClick={nextStep}
                disabled={saving}
              >
                {text.next}
              </button>
            ) : (
              <button
                type="button"
                className="submit-button"
                onClick={submitProfile}
                disabled={
                  saving ||
                  approvalStatus === "pending" ||
                  approvalStatus === "approved"
                }
              >
                {approvalStatus === "pending" ||
                approvalStatus === "approved"
                  ? text.awaitingApproval
                  : text.submitApproval}
              </button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}