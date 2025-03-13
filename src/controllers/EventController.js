const { Event } = require("../models/EventModel");

async function getEvents(req, res, next) {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
}

async function getEvent(req, res, next) {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
}

async function createEvent(req, res, next) {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (err) {
        next(err);
    }
}

async function updateEvent(req, res, next) {
    const { eventId } = req.params;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found to update" });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        next(err);
    }
}

async function deleteEvent(req, res, next) {
    const { eventId } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found to delete" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};
