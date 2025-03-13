const { Event } = require("../models/EventModel");

async function getEvents() {
    try {
        const events = await Event.find();
        return events;
    } catch (err) {
        console.error("Error fetching events:", err);
        throw new Error("Unable to fetch events.");
    }
}

async function getEvent(eventId) {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }
        return event;
    } catch (err) {
        console.error("Error fetching event:", err);
        throw new Error("Unable to fetch event.");
    }
}

async function createEvent(event) {
    try {
        const newEvent = await Event.create(event);
        return newEvent;
    } catch (err) {
        console.error("Error creating event:", err);
        throw new Error("Unable to create event.");
    }
}

async function updateEvent(eventId, event) {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, event, { new: true });
        if (!updatedEvent) {
            throw new Error("Event not found to update");
        }
        return updatedEvent;
    } catch (err) {
        console.error("Error updating event:", err);
        throw new Error("Unable to update event.");
    }
}

async function deleteEvent(eventId) {
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            throw new Error("Event not found to delete");
        }
        return deletedEvent;
    } catch (err) {
        console.error("Error deleting event:", err);
        throw new Error("Unable to delete event.");
    }
}

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};