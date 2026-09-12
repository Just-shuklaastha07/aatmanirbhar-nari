const mongoose = require("mongoose");
const BusinessProfile = require("../models/BusinessProfile");

// GET /api/admin/businesses/pending
const getPendingBusinesses = async (req, res) => {
  try {
    const businesses = await BusinessProfile.find({
      approvalStatus: "pending",
    })
      .populate("owner", "fullName email mobile city role")
      .sort({ submittedAt: 1 });

    return res.status(200).json({
      success: true,
      count: businesses.length,
      businesses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch pending business profiles.",
      error: error.message,
    });
  }
};

// GET /api/admin/businesses/:id
const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business profile ID.",
      });
    }

    const business = await BusinessProfile.findById(id).populate(
      "owner",
      "fullName email mobile city role"
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the business profile.",
      error: error.message,
    });
  }
};

// PATCH /api/admin/businesses/:id/status
const updateBusinessStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason = "" } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid business profile ID.",
      });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected.",
      });
    }

    if (status === "rejected" && !rejectionReason.trim()) {
      return res.status(400).json({
        success: false,
        message: "A rejection reason is required.",
      });
    }

    const business = await BusinessProfile.findById(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found.",
      });
    }

    if (business.approvalStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Only pending profiles can be reviewed. Current status: ${business.approvalStatus}.`,
      });
    }

    business.approvalStatus = status;

    if (status === "approved") {
      business.approvedAt = new Date();
      business.rejectionReason = "";
    } else {
      business.approvedAt = null;
      business.rejectionReason = rejectionReason.trim();
    }

    await business.save();

    const updatedBusiness = await BusinessProfile.findById(id).populate(
      "owner",
      "fullName email mobile city role"
    );

    return res.status(200).json({
      success: true,
      message:
        status === "approved"
          ? "Business profile approved successfully."
          : "Business profile rejected successfully.",
      business: updatedBusiness,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update the business profile status.",
      error: error.message,
    });
  }
};

module.exports = {
  getPendingBusinesses,
  getBusinessById,
  updateBusinessStatus,
};