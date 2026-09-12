const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    startingPrice: {
      type: Number,
      required: [true, "Starting price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  {
    _id: true,
  }
);

const businessProfileSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: [100, "Business name cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Business category is required"],
      enum: [
        "Tiffin Services",
        "Tailoring",
        "Beauty Services",
        "Handicrafts",
        "Home Bakery",
        "Tutoring",
        "Other",
      ],
    },

    description: {
      type: String,
      required: [true, "Business description is required"],
      trim: true,
      maxlength: [
        1000,
        "Business description cannot exceed 1000 characters",
      ],
    },

    experience: {
      type: Number,
      default: 0,
      min: [0, "Experience cannot be negative"],
      max: [60, "Enter a valid experience"],
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    locality: {
      type: String,
      required: [true, "Locality is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    pinCode: {
      type: String,
      required: [true, "PIN code is required"],
      match: [/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"],
    },

    serviceAreas: [
      {
        type: String,
        trim: true,
      },
    ],

    services: {
      type: [serviceSchema],
      default: [],
    },

    minimumPrice: {
      type: Number,
      default: 0,
      min: [0, "Minimum price cannot be negative"],
    },

    maximumPrice: {
      type: Number,
      default: 0,
      min: [0, "Maximum price cannot be negative"],
    },

    workingDays: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],

    openingTime: {
      type: String,
      default: "",
    },

    closingTime: {
      type: String,
      default: "",
    },

    homeDelivery: {
      type: Boolean,
      default: false,
    },

    whatsappNumber: {
      type: String,
      trim: true,
      match: [
        /^$|^[6-9]\d{9}$/,
        "Enter a valid 10-digit WhatsApp number",
      ],
      default: "",
    },

    businessImages: [
      {
        type: String,
      },
    ],

    approvalStatus: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BusinessProfile",
  businessProfileSchema
);