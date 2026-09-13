const express = require("express");

const {
  createInquiry,
  getSentInquiries,
  getReceivedInquiries,
  updateInquiryStatus,
  respondToInquiry,
} = require("../controllers/inquiryController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Every inquiry route requires login
router.use(protect);

// Customer routes
router.post("/", authorize("customer"), createInquiry);
router.get("/sent", authorize("customer"), getSentInquiries);

// Entrepreneur routes
router.get(
  "/received",
  authorize("entrepreneur"),
  getReceivedInquiries
);

router.patch(
  "/:id/status",
  authorize("entrepreneur"),
  updateInquiryStatus
);

router.patch(
  "/:id/respond",
  authorize("entrepreneur"),
  respondToInquiry
);

module.exports = router;