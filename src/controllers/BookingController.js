const { Booking } = require("../models/BookingModel");
const { User } = require("../models/UserModel");
const { Event } = require("../models/EventModel");
const { Location } = require("../models/LocationModel");

async function getBookings(req, res) {
    try {
        const bookings = await Booking.find()
            .populate('bookingUser')
            .populate('bookingEvent')
            .populate('bookingLocation');
        return res.status(200).json(bookings);  // Return all bookings
    } catch (err) {
        console.error("Error fetching bookings:", err);
        return res.status(500).json({ error: "Unable to fetch bookings." });
    }
}

async function getBooking(req, res) {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId)
            .populate('bookingUser')
            .populate('bookingEvent')
            .populate('bookingLocation');
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        return res.status(200).json(booking);
    } catch (err) {
        console.error("Error fetching booking:", err);
        return res.status(500).json({ error: "Unable to fetch booking." });
    }
}

async function createBooking(req, res) {
    const { userId, eventId, locationId, bookingStatus } = req.body;
    try {
        // Validate if the user, event, and location exist
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);
        const location = await Location.findById(locationId);

        if (!user || !event || !location) {
            return res.status(400).json({ error: "User, Event, or Location not found" });
        }

        // Create new booking
        const newBooking = await Booking.create({
            bookingUser: userId,
            bookingEvent: eventId,
            bookingLocation: locationId,
            bookingStatus: bookingStatus || 'Pending'  // Default to 'Pending' if no status is provided
        });

        return res.status(201).json(newBooking);  // Return the newly created booking
    } catch (err) {
        console.error("Error creating booking:", err);
        return res.status(400).json({ error: "Unable to create booking." });
    }
}

// Update a booking's status
async function updateBooking(req, res) {
    const { bookingId } = req.params;
    const { bookingStatus } = req.body;
    try {
        // Check if booking exists
        const booking = await Booking.findByIdAndUpdate(
            bookingId, 
            { bookingStatus }, 
            { new: true }  // Return the updated booking
        );

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        return res.status(200).json(booking);  // Return the updated booking
    } catch (err) {
        console.error("Error updating booking:", err);
        return res.status(400).json({ error: "Unable to update booking." });
    }
}

// Delete a booking
async function deleteBooking(req, res) {
    const { bookingId } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error("Error deleting booking:", err);
        return res.status(500).json({ error: "Unable to delete booking." });
    }
}

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
};