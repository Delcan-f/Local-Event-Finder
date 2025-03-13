const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    bookingUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingEvent: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    bookingStatus: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending' // Default status when a booking is created
    },
    bookingDate: {
        type: Date,
        default: Date.now, // Automatically set to current time
        required: true
    }
}, { timestamps: true });

// Indexing for better query performance
BookingSchema.index({ bookingUser: 1 });
BookingSchema.index({ bookingEvent: 1 });
BookingSchema.index({ bookingStatus: 1 });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = {
    Booking
};
