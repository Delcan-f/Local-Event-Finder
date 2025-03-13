const { Review } = require("../models/ReviewModel");
const { User } = require("../models/UserModel");
const { Event } = require("../models/EventModel");

// Get all reviews for a specific event
async function getReviewsForEvent(req, res) {
    const { eventId } = req.params;
    try {
        const reviews = await Review.find({ event: eventId })
            .populate('user')
            .populate('event'); // 
        
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this event." });
        }

        return res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews for event:", err);
        return res.status(500).json({ error: "Unable to fetch reviews." });
    }
}

async function getReviewsForUser(req, res) {
    const { userId } = req.params;
    try {
        const reviews = await Review.find({ user: userId })
            .populate('user')
            .populate('event');

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user." });
        }

        return res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews for user:", err);
        return res.status(500).json({ error: "Unable to fetch reviews." });
    }
}

async function getReview(req, res) {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId)
            .populate('user')
            .populate('event');

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        return res.status(200).json(review);
    } catch (err) {
        console.error("Error fetching review:", err);
        return res.status(500).json({ error: "Unable to fetch review." });
    }
}

async function createReview(req, res) {
    const { userId, eventId, rating, comments } = req.body;

    try {
        // Validate if the user and event exist
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
            return res.status(400).json({ error: "User or Event not found" });
        }

        // Create the new review
        const newReview = await Review.create({
            user: userId,
            event: eventId,
            rating,
            comments: comments || ""
        });

        return res.status(201).json(newReview);
    } catch (err) {
        console.error("Error creating review:", err);
        return res.status(400).json({ error: "Unable to create review." });
    }
}

async function updateReview(req, res) {
    const { reviewId } = req.params;
    const { rating, comments } = req.body;

    try {
        // Check if the review exists
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, comments },
            { new: true }  // Return the updated review
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        return res.status(200).json(updatedReview);  // Return the updated review
    } catch (err) {
        console.error("Error updating review:", err);
        return res.status(400).json({ error: "Unable to update review." });
    }
}

// Delete a review
async function deleteReview(req, res) {
    const { reviewId } = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error("Error deleting review:", err);
        return res.status(500).json({ error: "Unable to delete review." });
    }
}

module.exports = {
    getReviewsForEvent,
    getReviewsForUser,
    getReview,
    createReview,
    updateReview,
    deleteReview
};