const mongoose = require("mongoose");
const Review = require("../models/ReviewModel");
const User = require("../models/UserModel");
const Event = require("../models/EventModel");

// Get all reviews for a specific event
async function getReviewsForEvent(req, res) {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID format" });
    }

    try {
        const reviews = await Review.find({ event: eventId })
            .populate("user")
            .populate("event");

        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews for event:", err);
        res.status(500).json({ error: "Error fetching reviews" });
    }
}

// Get all reviews for a specific user
async function getReviewsForUser(req, res) {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    try {
        const reviews = await Review.find({ user: userId })
            .populate("user")
            .populate("event");

        res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews for user:", err);
        res.status(500).json({ error: "Error fetching reviews" });
    }
}

// Get a single review
async function getReview(req, res) {
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ error: "Invalid review ID format" });
    }

    try {
        const review = await Review.findById(reviewId)
            .populate("user")
            .populate("event");

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (err) {
        console.error("Error fetching review:", err);
        res.status(500).json({ error: "Error fetching review" });
    }
}

// Create a new review
async function createReview(req, res) {
    try {
        const { userId, eventId, rating, comments } = req.body;

        if (!userId || !eventId || rating == null) {
            return res.status(400).json({ error: "User ID, Event ID, and rating are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ error: "Invalid User ID or Event ID format" });
        }

        const [user, event] = await Promise.all([
            User.findById(userId),
            Event.findById(eventId),
        ]);

        if (!user || !event) {
            return res.status(404).json({ error: "User or Event not found" });
        }

        const newReview = await Review.create({
            user: userId,
            event: eventId,
            rating,
            comments: comments || "",
        });

        res.status(201).json(newReview);
    } catch (err) {
        console.error("Error creating review:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Error creating review" });
    }
}

// Update a review
async function updateReview(req, res) {
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ error: "Invalid review ID format" });
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(updatedReview);
    } catch (err) {
        console.error("Error updating review:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Error updating review" });
    }
}

// Delete a review
async function deleteReview(req, res) {
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ error: "Invalid review ID format" });
    }

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ error: "Error deleting review" });
    }
}

module.exports = {
    getReviewsForEvent,
    getReviewsForUser,
    getReview,
    createReview,
    updateReview,
    deleteReview,
};
