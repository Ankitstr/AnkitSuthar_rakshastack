const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require("./db");

// Connect to database
connectDB();

// Import routes
const userRoutes = require("./routes/userRoutes");
const pgRoutes = require("./routes/pgRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pgs", pgRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "PG Searching Website Backend API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
