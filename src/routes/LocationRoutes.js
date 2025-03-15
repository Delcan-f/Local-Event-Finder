const express = require("express");
const router = express.Router();
const {
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation
} = require("../controllers/LocationController");

// Create a new location
router.post("/", createLocation); // ✅ Pass the function directly

// Get a specific location by ID
router.get("/:locationId", getLocation); // ✅ Pass the function directly

// Update a location by ID
router.patch("/:locationId", updateLocation); // ✅ Pass the function directly

// Delete a location by ID
router.delete("/:locationId", deleteLocation); // ✅ Pass the function directly

module.exports = router;