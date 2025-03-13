const express = require("express");
const router = express.Router();
const {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require("../controllers/BookingController")

// Get all bookings
router.get('/', async (request, response) => {
    try {
        const bookings = await getBookings();
        response.status(200).json(bookings);
    } catch (error) {
        console.error("Error getting bookings:", error);
        response.status(500).json({message: "Error getting bookings"});
    }
});

// Get a single booking using booking ID
router.get("/:bookingId", async (request, response) => {
    const { bookingId } = request.params;
    try {
        const booking = await getBooking(bookingId);
        if (!booking) {
            return response.status(404).json({message: "Booking not found"});
        }
        response.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking", error);
        response.status(500).json({message: "Error fetching booking"});
    }
});

// Create a new booking
router.post('/', async (request, response) => {
    const { bookingUser, bookingEvent, bookingStatus } = request.body;

    try {
        const newBooking = await createBooking({
            bookingUser,
            bookingEvent,
            bookingStatus
        });
        response.status(201).json(newBooking);
    } catch (error) {
        console.error("Unable to create booking", error);
        response.status(400).json({message: "Unable to create booking"});
    }
});

// Update existing booking using booking ID
router.patch('/:bookingId', async (request, response) => {
    const { bookingId } = request.params;
    const { bookingUser, bookingEvent, bookingStatus } = request.body;

    const updateData = {};
    if (bookingUser) updateData.bookingUser = bookingUser;
    if (bookingEvent) updateData.bookingEvent = bookingEvent;
    if (bookingStatus) updateData.bookingStatus - bookingStatus;

    try {
        const updatedBooking = await updateBooking(bookingId, updateData);

        if (!updatedBooking) {
            return response.status(404).json({message: "Unable to find booking"});
        }
        response.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error);
        response.status(400).json({message: "Error updating booking"});
    }
});

// Delete existing booking using booking ID
router.delete('/:bookingId', async (request, response) => {
    const { bookingId } = request.params;
    try {
        const deletedBooking = await deleteBooking(bookingId);
        if (!deletedBooking) {
            return response.status(404).json({message: "Booking not found"});
        }
        response.status(200).json({message: "Booking deleted successfully"});
    } catch (error) {
        console.error("Unable to delete booking", error);
        response.status(500).json({message: "Unable to delete booking"});
    }
});

module.exports = router;