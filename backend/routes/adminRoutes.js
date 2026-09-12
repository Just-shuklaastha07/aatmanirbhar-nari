const express = require("express");

const {
  getPendingBusinesses,
  getBusinessById,
  updateBusinessStatus,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/businesses/pending", getPendingBusinesses);
router.get("/businesses/:id", getBusinessById);
router.patch("/businesses/:id/status", updateBusinessStatus);

module.exports = router;