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
router.get('/', async (req, res, next) => {
    try {
        const bookings = await getBookings();
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
});

// Get a single booking using booking ID
router.get("/:bookingId", async (req, res, next) => {
    try {
        const booking = await getBooking(req.params.bookingId);
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
});

// Create a new booking
router.post('/', async (req, res, next) => {
    try {
        const newBooking = await createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});

// Update existing booking using booking ID
router.patch('/:bookingId', async (req, res, next) => {
    try {
        const updatedBooking = await updateBooking(req.params.bookingId, req.body);
        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
});

// Delete existing booking using booking ID
router.delete('/:bookingId', async (req, res, next) => {
    try {
        await deleteBooking(req.params.bookingId);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
