const { Event } = require("../models/EventModel")

async function getEvents() {
    const events = await Event.find()
    return events
};

async function getEvent(eventId) {
    const event = await Event.findById(eventId)
    return event
};

async function createEvent(event) {
    const newEvent = await Event.create(event)
    return newEvent
};

async function updateEvent(event) {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event, { new: true })
    return updatedEvent
};

async function deleteEvent(eventId) {
    const deletedEvent = await Event.findByIdAndDelete(eventId)
    return deletedEvent
};

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}