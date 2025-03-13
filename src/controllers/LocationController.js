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
    try {
        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }
        return res.status(200).json(location);
    } catch (err) {
        console.error("Error fetching location:", err);
        return res.status(500).json({ error: "Unable to fetch location." });
    }
}

async function createLocation(req, res) {
    const locationData = req.body;
    try {
        const newLocation = await Location.create(locationData);
        return res.status(201).json(newLocation);
    } catch (err) {
        console.error("Error creating location:", err);
        return res.status(400).json({ error: "Unable to create location." });
    }
}

async function updateLocation(req, res) {
    const { locationId } = req.params;
    const updatedData = req.body;
    try {
        const updatedLocation = await Location.findByIdAndUpdate(locationId, updatedData, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ error: "Location not found" });
        }
        return res.status(200).json(updatedLocation);
    } catch (err) {
        console.error("Error updating location:", err);
        return res.status(400).json({ error: "Unable to update location." });
    }
}

async function deleteLocation(req, res) {
    const { locationId } = req.params;
    try {
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ error: "Location not found" });
        }
        return res.status(200).json({ message: "Location deleted successfully" });
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