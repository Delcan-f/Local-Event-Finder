const express = require("express");
const router = express.Router();
const {
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation
} = require("../controllers/LocationController");

// Create a new location
router.post("/", createLocation);

// Get a specific location by ID
router.get("/:locationId", getLocation);

// Update a location by ID
router.patch("/:locationId", updateLocation);

// Delete a location by ID
router.delete("/:locationId", deleteLocation);

module.exports = router;