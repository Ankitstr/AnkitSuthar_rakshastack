const express = require("express");
const {
  addPG,
  getPGs,
  getPGById,
  getOwnerPGs,
} = require("../controllers/pgController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get all PGs route (public)
router.get("/", getPGs);

// Get PG by ID route (public)
router.get("/:id", getPGById);

// Get owner's PGs route (protected)
router.get("/owner/dashboard", protect, getOwnerPGs);

// Add PG route (protected)
router.post("/add-pg", protect, upload.array("images", 5), addPG);

module.exports = router;
