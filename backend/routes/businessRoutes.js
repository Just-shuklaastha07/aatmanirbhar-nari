const express = require("express");

const {
  createBusinessProfile,
  getMyBusinessProfile,
  updateMyBusinessProfile,
  submitBusinessProfile,
} = require("../controllers/businessController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("entrepreneur"));

router.post("/profile", createBusinessProfile);
router.get("/profile/me", getMyBusinessProfile);
router.put("/profile/me", updateMyBusinessProfile);
router.post("/profile/submit", submitBusinessProfile);

module.exports = router;