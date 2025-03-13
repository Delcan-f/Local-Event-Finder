const express = require("express");
const router = express.Router();
const {
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation
} = require("../controllers/LocationController");

// Create a new location
router.post("/", async (req, res, next) => {
    try {
        const location = await createLocation(req.body);
        res.status(201).json(location);
    } catch (error) {
        next(error);
    }
});

// Get a specific location by ID
router.get("/:locationId", async (req, res, next) => {
    try {
        const location = await getLocation(req.params.locationId);
        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
});

// Update a location by ID
router.patch("/:locationId", async (req, res, next) => {
    try {
        const updatedLocation = await updateLocation(req.params.locationId, req.body);
        res.status(200).json(updatedLocation);
    } catch (error) {
        next(error);
    }
});

// Delete a location by ID
router.delete("/:locationId", async (req, res, next) => {
    try {
        await deleteLocation(req.params.locationId);
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
