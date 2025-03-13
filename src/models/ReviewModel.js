const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true,
        unique: false
    },
    rating: {
        type: Number,
        max: [10, 'Rating cannot go higher than 10'],
        required: true,
        unique: false
    },
    comments: {
        type: String,
        
    }
});

const Review = mongoose.model('Review', ReviewSchema)

module.exports = {
    Review
}