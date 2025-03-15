const mongoose = require("mongoose");
const { Location } = require("../models/LocationModel");

// Get all locations
async function getLocations(req, res) {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        console.error("Error fetching locations:", err);
        res.status(500).json({ message: "Error fetching locations." });
    }
}

// Get a single location
async function getLocation(req, res) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ message: "Invalid location ID format." });
    }

    try {
        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ message: "Location not found." });
        }
        res.status(200).json(location);
    } catch (err) {
        console.error("Error fetching location:", err);
        res.status(500).json({ message: "Error fetching location." });
    }
}

// Create a new location
async function createLocation(req, res) {
    try {
        const newLocation = await Location.create(req.body);
        res.status(201).json(newLocation);
    } catch (err) {
        console.error("Error creating location:", err);
        res.status(400).json({ message: "Error creating location." });
    }
}

// Update a location
async function updateLocation(req, res) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ message: "Invalid location ID format." });
    }

    try {
        const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, { new: true, runValidators: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found." });
        }
        res.status(200).json(updatedLocation);
    } catch (err) {
        console.error("Error updating location:", err);
        res.status(400).json({ message: "Error updating location." });
    }
}

// Delete a location
async function deleteLocation(req, res) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ message: "Invalid location ID format." });
    }

    try {
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found." });
        }
        res.status(200).json({ message: "Location deleted successfully." });
    } catch (err) {
        console.error("Error deleting location:", err);
        res.status(500).json({ message: "Error deleting location." });
    }
}

module.exports = {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
};