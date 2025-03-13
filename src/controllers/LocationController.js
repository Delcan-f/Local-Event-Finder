const mongoose = require("mongoose");
const { Location } = require("../models/LocationModel");

async function getLocations(req, res) {
    try {
        const locations = await Location.find();
        return res.status(200).json(locations);
    } catch (err) {
        console.error("Error fetching locations:", err);
        return res.status(500).json({ error: "Unable to fetch locations." });
    }
}

async function getLocation(req, res) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ error: "Invalid location ID format." });
    }

    try {
        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ error: "Location not found." });
        }
        return res.status(200).json(location);
    } catch (err) {
        console.error("Error fetching location:", err);
        return res.status(500).json({ error: "Unable to fetch location." });
    }
}

async function createLocation(req, res) {
    try {
        const newLocation = await Location.create(req.body);
        return res.status(201).json(newLocation);
    } catch (err) {
        console.error("Error creating location:", err);

        if (err.name === "ValidationError") {
            return res.status(422).json({ error: err.message });
        }

        return res.status(400).json({ error: "Unable to create location." });
    }
}

async function updateLocation(req, res) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ error: "Invalid location ID format." });
    }

    try {
        const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, { new: true, runValidators: true });
        
        if (!updatedLocation) {
            return res.status(404).json({ error: "Location not found." });
        }

        return res.status(200).json(updatedLocation);
    } catch (err) {
        console.error("Error updating location:", err);

        if (err.name === "ValidationError") {
            return res.status(422).json({ error: err.message });
        }

        return res.status(400).json({ error: "Unable to update location." });
    }
}

async function deleteLocation(req, res) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ error: "Invalid location ID format." });
    }

    try {
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ error: "Location not found." });
        }
        return res.status(200).json({ message: "Location deleted successfully." });
    } catch (err) {
        console.error("Error deleting location:", err);
        return res.status(500).json({ error: "Unable to delete location." });
    }
}

module.exports = {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
};