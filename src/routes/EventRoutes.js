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
router.get("/", async (req, res) => {
    try {
        const events = await getEvents();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
});

// Get a specific event by ID
router.get("/:eventId", async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await getEvent(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: "Error fetching event" });
    }
});

// Create a new event
router.post("/", async (req, res) => {
    const { name, description, date, eventLocation, price, category } = req.body;

    try {
        const newEvent = await createEvent({
            name,
            description,
            date,
            eventLocation,
            price,
            category
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(400).json({ message: "Error creating event" });
    }
});

// Update an existing event by ID
router.patch("/:eventId", async (req, res) => {
    const { eventId } = req.params;
    const { name, description, date, eventLocation, price, category } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (date) updateData.date = date;
    if (eventLocation) updateData.eventLocation = eventLocation;
    if (price) updateData.price = price;
    if (category) updateData.category = category;

    try {
        const updatedEvent = await updateEvent(eventId, updateData);

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(400).json({ message: "Error updating event" });
    }
});

// Delete an event by ID
router.delete("/:eventId", async (req, res) => {
    const { eventId } = req.params;
    try {
        const deletedEvent = await deleteEvent(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Error deleting event" });
    }
});



module.exports = router;