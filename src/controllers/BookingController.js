const mongoose = require("mongoose");
const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const Event = require("../models/EventModel");
const Location = require("../models/LocationModel");

async function getBookings(req, res) {
    try {
        const bookings = await Booking.find()
            .populate('bookingUser')
            .populate('bookingEvent')
            .populate('bookingLocation');

        res.status(200).json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: "Error fetching bookings" });
    }
}

async function getBooking(req, res) {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ error: "Invalid booking ID format" });
    }

    try {
        const booking = await Booking.findById(bookingId)
            .populate('bookingUser')
            .populate('bookingEvent')
            .populate('bookingLocation');

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ error: "Error fetching booking" });
    }
}

async function createBooking(req, res) {
    const { userId, eventId, locationId, bookingStatus } = req.body;

    if (!userId || !eventId || !locationId) {
        return res.status(400).json({ error: "userId, eventId, and locationId are required" });
    }

    try {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);
        const location = await Location.findById(locationId);

        if (!user || !event || !location) {
            return res.status(404).json({ error: "User, Event, or Location not found" });
        }

        const newBooking = await Booking.create({
            bookingUser: userId,
            bookingEvent: eventId,
            bookingLocation: locationId,
            bookingStatus: bookingStatus || 'Pending'
        });

        res.status(201).json(newBooking);
    } catch (err) {
        console.error("Error creating booking:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Error creating booking" });
    }
}

async function updateBooking(req, res) {
    const { bookingId } = req.params;
    const { bookingStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ error: "Invalid booking ID format" });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, 
            { bookingStatus }, 
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(updatedBooking);
    } catch (err) {
        console.error("Error updating booking:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Error updating booking" });
    }
}

async function deleteBooking(req, res) {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ error: "Invalid booking ID format" });
    }

    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error("Error deleting booking:", err);
        res.status(500).json({ error: "Error deleting booking" });
    }
}

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
};
