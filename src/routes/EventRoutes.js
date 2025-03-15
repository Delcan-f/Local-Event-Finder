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
router.get("/", getEvents);

// Get a specific event by ID
router.get("/:eventId", getEvent);

// Create a new event
router.post("/", createEvent);

// Update an existing event by ID
router.patch("/:eventId", updateEvent);

// Delete an event by ID
router.delete("/:eventId", deleteEvent);

module.exports = router;
