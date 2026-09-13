const mongoose = require("mongoose");
const Inquiry = require("../models/Inquiry");
const BusinessProfile = require("../models/BusinessProfile");

const getValidationMessage = (error) => {
  return Object.values(error.errors)
    .map((item) => item.message)
    .join(" ");
};

// POST /api/inquiries
// Customer sends an inquiry
const createInquiry = async (req, res) => {
  try {
    const { businessId, subject, message } = req.body;

    if (!mongoose.isValidObjectId(businessId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business profile ID.",
      });
    }

    const business = await BusinessProfile.findOne({
      _id: businessId,
      approvalStatus: "approved",
    });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Approved business profile not found.",
      });
    }

    const inquiry = await Inquiry.create({
      business: business._id,
      customer: req.user._id,
      entrepreneur: business.owner,
      subject,
      message,
    });

    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("business", "businessName category city locality")
      .populate("customer", "fullName email mobile")
      .populate("entrepreneur", "fullName");

    return res.status(201).json({
      success: true,
      message: "Inquiry sent successfully.",
      inquiry: populatedInquiry,
    });
  } catch (error) {
    console.error("Create inquiry error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to send the inquiry.",
    });
  }
};

// GET /api/inquiries/sent
// Customer views sent inquiries
const getSentInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({
      customer: req.user._id,
    })
      .populate(
        "business",
        "businessName category city locality whatsappNumber"
      )
      .populate("entrepreneur", "fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error("Get sent inquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve sent inquiries.",
    });
  }
};

// GET /api/inquiries/received
// Entrepreneur views received inquiries
const getReceivedInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({
      entrepreneur: req.user._id,
    })
      .populate("business", "businessName category")
      .populate("customer", "fullName email mobile city")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error("Get received inquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve received inquiries.",
    });
  }
};

// PATCH /api/inquiries/:id/status
// Entrepreneur marks inquiry as read or closed
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    if (!["read", "closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be read or closed.",
      });
    }

    const inquiry = await Inquiry.findOne({
      _id: id,
      entrepreneur: req.user._id,
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    inquiry.status = status;
    await inquiry.save();

    return res.status(200).json({
      success: true,
      message: `Inquiry marked as ${status}.`,
      inquiry,
    });
  } catch (error) {
    console.error("Update inquiry status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update the inquiry status.",
    });
  }
};

// PATCH /api/inquiries/:id/respond
// Entrepreneur responds to an inquiry
const respondToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    if (!response || response.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "A response is required.",
      });
    }

    const inquiry = await Inquiry.findOne({
      _id: id,
      entrepreneur: req.user._id,
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    if (inquiry.status === "closed") {
      return res.status(400).json({
        success: false,
        message: "A closed inquiry cannot be answered.",
      });
    }

    inquiry.response = response.trim();
    inquiry.status = "responded";
    inquiry.respondedAt = new Date();

    await inquiry.save();

    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("business", "businessName category")
      .populate("customer", "fullName email mobile city");

    return res.status(200).json({
      success: true,
      message: "Response sent successfully.",
      inquiry: populatedInquiry,
    });
  } catch (error) {
    console.error("Respond to inquiry error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: getValidationMessage(error),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to respond to the inquiry.",
    });
  }
};

module.exports = {
  createInquiry,
  getSentInquiries,
  getReceivedInquiries,
  updateInquiryStatus,
  respondToInquiry,
};