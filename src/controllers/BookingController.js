const { Booking } = require("../models/BookingModel");
const { User } = require("../models/UserModel");
const { Event } = require("../models/EventModel");
const { Location } = require("../models/LocationModel");

async function getBookings(req, res, next) {
    try {
        const bookings = await Booking.find()
            .populate('bookingUser')
            .populate('bookingEvent')
            .populate('bookingLocation');
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
}

async function getBooking(req, res, next) {
    const { bookingId } = req.params;
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
        next(err);
    }
}

async function createBooking(req, res, next) {
    const { userId, eventId, locationId, bookingStatus } = req.body;
    try {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);
        const location = await Location.findById(locationId);

        if (!user || !event || !location) {
            return res.status(400).json({ error: "User, Event, or Location not found" });
        }

        const newBooking = await Booking.create({
            bookingUser: userId,
            bookingEvent: eventId,
            bookingLocation: locationId,
            bookingStatus: bookingStatus || 'Pending'
        });

        res.status(201).json(newBooking);
    } catch (err) {
        next(err);
    }
}

async function updateBooking(req, res, next) {
    const { bookingId } = req.params;
    const { bookingStatus } = req.body;
    try {
        const booking = await Booking.findByIdAndUpdate(
            bookingId, 
            { bookingStatus }, 
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
}

async function deleteBooking(req, res, next) {
    const { bookingId } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
};
