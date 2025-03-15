const mongoose = require("mongoose");
const Event = require("../models/EventModel");

async function getEvents(req, res) {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Error fetching events" });
    }
}

async function getEvent(req, res) {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID format" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error("Error fetching event:", err);
        res.status(500).json({ error: "Error fetching event" });
    }
}

async function createEvent(req, res) {
    try {
        const { eventName, eventDate, eventLocation } = req.body;

        if (!eventName || !eventDate || !eventLocation) {
            return res.status(400).json({ error: "eventName, eventDate, and eventLocation are required" });
        }

        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (err) {
        console.error("Error creating event:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Error creating event" });
    }
}

async function updateEvent(req, res) {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID format" });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true, runValidators: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found to update" });
        }

        res.status(200).json(updatedEvent);
    } catch (err) {
        console.error("Error updating event:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Error updating event" });
    }
}

async function deleteEvent(req, res) {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID format" });
    }

    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found to delete" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({ error: "Error deleting event" });
    }
}

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};
