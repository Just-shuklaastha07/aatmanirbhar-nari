const BusinessProfile = require("../models/BusinessProfile");

const calculateProfileCompletion = (profileData) => {
  const fields = [
    profileData.businessName,
    profileData.category,
    profileData.description,
    profileData.locality,
    profileData.city,
    profileData.pinCode,
    profileData.services?.length > 0,
    profileData.workingDays?.length > 0,
    profileData.openingTime,
    profileData.closingTime,
  ];

  const completedFields = fields.filter(Boolean).length;

  return Math.round((completedFields / fields.length) * 100);
};

const createBusinessProfile = async (req, res) => {
  try {
    const existingProfile = await BusinessProfile.findOne({
      owner: req.user._id,
    });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message:
          "You already have a business profile. Please update it instead.",
      });
    }

    const profileData = {
      ...req.body,
      owner: req.user._id,
      approvalStatus: "draft",
      rejectionReason: "",
    };

    profileData.profileCompletion =
      calculateProfileCompletion(profileData);

    const profile = await BusinessProfile.create(profileData);

    return res.status(201).json({
      success: true,
      message: "Business profile created successfully.",
      profile,
    });
  } catch (error) {
    console.error("Create business profile error:", error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((item) => item.message)
        .join(" ");

      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create business profile.",
    });
  }
};

const getMyBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({
      owner: req.user._id,
    }).populate("owner", "fullName email mobile city");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Get business profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve business profile.",
    });
  }
};

const updateMyBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({
      owner: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found.",
      });
    }

    const protectedFields = [
      "owner",
      "approvalStatus",
      "rejectionReason",
      "profileCompletion",
      "submittedAt",
      "approvedAt",
    ];

    protectedFields.forEach((field) => {
      delete req.body[field];
    });

    Object.assign(profile, req.body);

    profile.profileCompletion =
      calculateProfileCompletion(profile);

    if (
      profile.approvalStatus === "rejected" ||
      profile.approvalStatus === "pending"
    ) {
      profile.approvalStatus = "draft";
      profile.rejectionReason = "";
      profile.submittedAt = null;
    }

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Business profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error("Update business profile error:", error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((item) => item.message)
        .join(" ");

      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update business profile.",
    });
  }
};

const submitBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({
      owner: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Create your business profile before submitting it.",
      });
    }

    const requiredFields = [
      profile.businessName,
      profile.category,
      profile.description,
      profile.locality,
      profile.city,
      profile.pinCode,
      profile.services.length > 0,
      profile.workingDays.length > 0,
      profile.openingTime,
      profile.closingTime,
    ];

    const profileIsComplete = requiredFields.every(Boolean);

    if (!profileIsComplete) {
      return res.status(400).json({
        success: false,
        message:
          "Complete all required business information before submitting.",
      });
    }

    if (
      profile.maximumPrice &&
      profile.minimumPrice > profile.maximumPrice
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum price must be greater than or equal to minimum price.",
      });
    }

    profile.profileCompletion = 100;
    profile.approvalStatus = "pending";
    profile.submittedAt = new Date();
    profile.rejectionReason = "";

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Business profile submitted for admin approval.",
      profile,
    });
  } catch (error) {
    console.error("Submit business profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit business profile.",
    });
  }
};

module.exports = {
  createBusinessProfile,
  getMyBusinessProfile,
  updateMyBusinessProfile,
  submitBusinessProfile,
};