const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessProfile",
      required: [true, "Business profile is required"],
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
      index: true,
    },

    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Entrepreneur is required"],
      index: true,
    },

    subject: {
      type: String,
      required: [true, "Inquiry subject is required"],
      trim: true,
      minlength: [3, "Subject must contain at least 3 characters"],
      maxlength: [120, "Subject cannot exceed 120 characters"],
    },

    message: {
      type: String,
      required: [true, "Inquiry message is required"],
      trim: true,
      minlength: [10, "Message must contain at least 10 characters"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["new", "read", "responded", "closed"],
      default: "new",
      index: true,
    },

    response: {
      type: String,
      trim: true,
      maxlength: [1000, "Response cannot exceed 1000 characters"],
      default: "",
    },

    respondedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

inquirySchema.index({
  business: 1,
  customer: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Inquiry", inquirySchema);