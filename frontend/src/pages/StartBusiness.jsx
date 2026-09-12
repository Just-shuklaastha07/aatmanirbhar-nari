import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

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

export default function StartBusiness() {
  const { token } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [profileExists, setProfileExists] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("draft");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
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
    }
  }, [token]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setMessage("");
  };

  const handleDayChange = (day) => {
    setForm((previous) => ({
      ...previous,
      workingDays: previous.workingDays.includes(day)
        ? previous.workingDays.filter((item) => item !== day)
        : [...previous.workingDays, day],
    }));
  };

  const validateCurrentStep = () => {
    if (step === 1) {
      if (
        !form.businessName.trim() ||
        !form.category ||
        !form.description.trim()
      ) {
        return "Complete all required business details.";
      }
    }

    if (step === 2) {
      if (
        !form.locality.trim() ||
        !form.city.trim() ||
        !/^[1-9][0-9]{5}$/.test(form.pinCode)
      ) {
        return "Enter a locality, city and valid 6-digit PIN code.";
      }
    }

    if (step === 3) {
      if (
        !form.serviceName.trim() ||
        form.startingPrice === ""
      ) {
        return "Enter at least one service and its starting price.";
      }

      if (
        Number(form.maximumPrice) > 0 &&
        Number(form.minimumPrice) >
          Number(form.maximumPrice)
      ) {
        return "Maximum price must be greater than minimum price.";
      }
    }

    if (step === 4) {
      if (
        form.workingDays.length === 0 ||
        !form.openingTime ||
        !form.closingTime
      ) {
        return "Select working days and business timings.";
      }

      if (
        form.whatsappNumber &&
        !/^[6-9]\d{9}$/.test(form.whatsappNumber)
      ) {
        return "Enter a valid 10-digit WhatsApp number.";
      }
    }

    return "";
  };

  const nextStep = () => {
    const validationError = validateCurrentStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStep((previous) => Math.min(previous + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setError("");
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
      setMessage("");

      const profileData = prepareProfileData();

      const data = profileExists
        ? await updateBusinessProfile(profileData, token)
        : await createBusinessProfile(profileData, token);

      setProfileExists(true);
      setApprovalStatus(data.profile.approvalStatus);
      setProfileCompletion(data.profile.profileCompletion);
      setMessage("Business profile saved as draft.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const submitProfile = async () => {
    try {
      for (let currentStep = 1; currentStep <= 4; currentStep++) {
        setStep(currentStep);

        const validationError = validateStep(currentStep);

        if (validationError) {
          setError(validationError);
          return;
        }
      }

      setSaving(true);
      setError("");
      setMessage("");

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
      setMessage("Profile submitted successfully for admin approval.");
      setStep(5);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const validateStep = (stepNumber) => {
    if (
      stepNumber === 1 &&
      (!form.businessName.trim() ||
        !form.category ||
        !form.description.trim())
    ) {
      return "Complete all required business details.";
    }

    if (
      stepNumber === 2 &&
      (!form.locality.trim() ||
        !form.city.trim() ||
        !/^[1-9][0-9]{5}$/.test(form.pinCode))
    ) {
      return "Complete the location information.";
    }

    if (
      stepNumber === 3 &&
      (!form.serviceName.trim() ||
        form.startingPrice === "")
    ) {
      return "Add at least one service and starting price.";
    }

    if (
      stepNumber === 4 &&
      (form.workingDays.length === 0 ||
        !form.openingTime ||
        !form.closingTime)
    ) {
      return "Complete your availability information.";
    }

    return "";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="business-loading">
          Loading your business profile...
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
                Entrepreneur onboarding
              </p>

              <h1>Create Your Business Profile</h1>

              <p>
                Add your business details so customers can discover
                your services.
              </p>
            </div>

            <div className="profile-summary">
              <strong>{profileCompletion}%</strong>
              <span>Profile complete</span>

              <span className={`status-badge ${approvalStatus}`}>
                {approvalStatus}
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
                <small>
                  {
                    [
                      "Business",
                      "Location",
                      "Services",
                      "Availability",
                      "Preview",
                    ][number - 1]
                  }
                </small>
              </div>
            ))}
          </div>

          {message && (
            <div className="business-success" role="status">
              {message}
            </div>
          )}

          {error && (
            <div className="business-error" role="alert">
              {error}
            </div>
          )}

          {step === 1 && (
            <section className="form-step">
              <h2>Business Details</h2>

              <div className="business-form-grid">
                <label>
                  Business name *
                  <input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="Example: Anita's Tiffin Service"
                  />
                </label>

                <label>
                  Business category *
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="Tiffin Services">
                      Tiffin Services
                    </option>
                    <option value="Tailoring">Tailoring</option>
                    <option value="Beauty Services">
                      Beauty Services
                    </option>
                    <option value="Handicrafts">
                      Handicrafts
                    </option>
                    <option value="Home Bakery">
                      Home Bakery
                    </option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  Experience in years
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
                  Business description *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe your business and what makes it special"
                  />
                </label>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="form-step">
              <h2>Business Location</h2>

              <div className="business-form-grid">
                <label className="full-field">
                  Address
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Locality *
                  <input
                    name="locality"
                    value={form.locality}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  City *
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  PIN code *
                  <input
                    name="pinCode"
                    value={form.pinCode}
                    onChange={handleChange}
                    maxLength="6"
                    inputMode="numeric"
                  />
                </label>

                <label>
                  Service areas
                  <input
                    name="serviceAreas"
                    value={form.serviceAreas}
                    onChange={handleChange}
                    placeholder="Ghaziabad, Noida, Delhi"
                  />
                </label>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="form-step">
              <h2>Services and Pricing</h2>

              <div className="business-form-grid">
                <label>
                  Service name *
                  <input
                    name="serviceName"
                    value={form.serviceName}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Starting price *
                  <input
                    type="number"
                    min="0"
                    name="startingPrice"
                    value={form.startingPrice}
                    onChange={handleChange}
                  />
                </label>

                <label className="full-field">
                  Service description
                  <textarea
                    name="serviceDescription"
                    value={form.serviceDescription}
                    onChange={handleChange}
                    rows="4"
                  />
                </label>

                <label>
                  Minimum price
                  <input
                    type="number"
                    min="0"
                    name="minimumPrice"
                    value={form.minimumPrice}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Maximum price
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
              <h2>Availability</h2>

              <p className="field-heading">Working days *</p>

              <div className="days-grid">
                {days.map((day) => (
                  <label key={day} className="day-option">
                    <input
                      type="checkbox"
                      checked={form.workingDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>

              <div className="business-form-grid availability-grid">
                <label>
                  Opening time *
                  <input
                    type="time"
                    name="openingTime"
                    value={form.openingTime}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Closing time *
                  <input
                    type="time"
                    name="closingTime"
                    value={form.closingTime}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  WhatsApp number
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
                  Home delivery available
                </label>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="form-step">
              <h2>Preview Your Profile</h2>

              <div className="profile-preview">
                <h3>{form.businessName || "Business name"}</h3>
                <p>{form.category}</p>
                <p>{form.description}</p>

                <dl>
                  <div>
                    <dt>Location</dt>
                    <dd>
                      {form.locality}, {form.city} – {form.pinCode}
                    </dd>
                  </div>

                  <div>
                    <dt>Service</dt>
                    <dd>
                      {form.serviceName} — ₹{form.startingPrice}
                    </dd>
                  </div>

                  <div>
                    <dt>Availability</dt>
                    <dd>
                      {form.workingDays.join(", ")}
                      <br />
                      {form.openingTime} – {form.closingTime}
                    </dd>
                  </div>

                  <div>
                    <dt>Home delivery</dt>
                    <dd>{form.homeDelivery ? "Yes" : "No"}</dd>
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
                Back
              </button>
            )}

            <button
              type="button"
              className="draft-button"
              onClick={saveDraft}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>

            {step < 5 ? (
              <button
                type="button"
                className="next-button"
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="submit-button"
                onClick={submitProfile}
                disabled={saving || approvalStatus === "pending"}
              >
                {approvalStatus === "pending"
                  ? "Awaiting Approval"
                  : "Submit for Approval"}
              </button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}