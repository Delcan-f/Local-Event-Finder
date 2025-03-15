const express = require("express");
const router = express.Router();
const {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/BookingController");

// Get all bookings
router.get("/", getBookings);

// Get a single booking using booking ID
router.get("/:bookingId", getBooking);

// Create a new booking
router.post("/", createBooking);

// Update existing booking using booking ID
router.patch("/:bookingId", updateBooking);

// Delete existing booking using booking ID
router.delete("/:bookingId", deleteBooking);

module.exports = router;
