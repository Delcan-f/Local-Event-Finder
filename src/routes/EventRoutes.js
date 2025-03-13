const express = require("express");
const router = express.Router();
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/EventController");

// Get all events
router.get("/", async (req, res, next) => {
    try {
        const events = await getEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

// Get a specific event by ID
router.get("/:eventId", async (req, res, next) => {
    try {
        const event = await getEvent(req.params.eventId);
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
});

// Create a new event
router.post("/", async (req, res, next) => {
    try {
        const newEvent = await createEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
});

// Update an existing event by ID
router.patch("/:eventId", async (req, res, next) => {
    try {
        const updatedEvent = await updateEvent(req.params.eventId, req.body);
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
});

// Delete an event by ID
router.delete("/:eventId", async (req, res, next) => {
    try {
        await deleteEvent(req.params.eventId);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
