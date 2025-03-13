const express = require("express");
const router = express.Router();
const { createLocation, getLocation, updateLocation, deleteLocation } = require("../controllers/LocationController");

// Create a new location
router.post("/", async (req, res) => {
    const { street, streetNumber, city, state, country } = req.body;
    try {
        const newLocation = await createLocation({ street, streetNumber, city, state, country });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ message: "Error creating location", error });
    }
});

// Get a specific location by ID
router.get("/:locationId", async (req, res) => {
    const { locationId } = req.params;
    try {
        const location = await getLocation(locationId);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: "Error fetching location", error });
    }
});

// Update a location by ID
router.patch("/:locationId", async (req, res) => {
    const { locationId } = req.params;
    const updateData = req.body;
    try {
        const updatedLocation = await updateLocation(locationId, updateData);
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(500).json({ message: "Error updating location", error });
    }
});

// Delete a location by ID
router.delete("/:locationId", async (req, res) => {
    const { locationId } = req.params;
    try {
        const deletedLocation = await deleteLocation(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting location", error });
    }
});

module.exports = router;