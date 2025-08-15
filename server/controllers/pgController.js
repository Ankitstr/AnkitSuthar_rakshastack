const PG = require("../models/PG");

// Add PG listing
const addPG = async (req, res) => {
  try {
    const { name, location, price, amenities, gender } = req.body;

    // Handle images
    let images = [];
    if (req.files) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      // If images are sent as URLs in the body
      images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    // Create PG listing
    const pg = await PG.create({
      name,
      location,
      price,
      amenities,
      gender,
      images,
      owner: req.user._id,
    });

    res.status(201).json(pg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all PG listings with search and filter
const getPGs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    // Location filter
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: "i" };
    }

    // Gender filter
    if (req.query.gender) {
      filter.gender = req.query.gender;
    }

    // Price range filter
    if (req.query.price) {
      const price = parseInt(req.query.price);
      filter.price = { $lte: price };
    }

    // Price range filter (min and max)
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseInt(req.query.maxPrice);
      }
    }

    const pgs = await PG.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("owner", "name");
    const total = await PG.countDocuments(filter);

    res.json({
      pgs,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PG details by ID
const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id).populate("owner", "name email");

    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.json(pg);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "PG not found" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get owner's PG listings
const getOwnerPGs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const pgs = await PG.find({ owner: req.user._id })
      .skip(skip)
      .limit(limit)
      .populate("owner", "name");
    const total = await PG.countDocuments({ owner: req.user._id });

    res.json({
      pgs,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPG,
  getPGs,
  getPGById,
  getOwnerPGs,
};
