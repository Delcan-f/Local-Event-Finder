const mongoose = require("mongoose");
const { Location } = require("../models/LocationModel");

async function getLocations(req, res, next) {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        next(err);
    }
}

async function getLocation(req, res, next) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ error: "Invalid location ID format." });
    }

    try {
        const location = await Location.findById(locationId);
        if (!location) {
            return res.status(404).json({ error: "Location not found." });
        }
        res.status(200).json(location);
    } catch (err) {
        next(err);
    }
}

async function createLocation(req, res, next) {
    try {
        const newLocation = await Location.create(req.body);
        res.status(201).json(newLocation);
    } catch (err) {
        next(err);
    }
}

async function updateLocation(req, res, next) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ error: "Invalid location ID format." });
    }

    try {
        const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, { new: true, runValidators: true });
        if (!updatedLocation) {
            return res.status(404).json({ error: "Location not found." });
        }
        res.status(200).json(updatedLocation);
    } catch (err) {
        next(err);
    }
}

async function deleteLocation(req, res, next) {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ error: "Invalid location ID format." });
    }

    try {
        const deletedLocation = await Location.findByIdAndDelete(locationId);
        if (!deletedLocation) {
            return res.status(404).json({ error: "Location not found." });
        }
        res.status(200).json({ message: "Location deleted successfully." });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
};
