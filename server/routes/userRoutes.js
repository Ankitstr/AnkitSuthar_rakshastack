const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Update profile route (protected)
router.put("/profile", protect, updateProfile);

module.exports = router;
