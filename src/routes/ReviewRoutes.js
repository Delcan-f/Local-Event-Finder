const express = require("express");
const router = express.Router();
const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/ReviewController");

// Get all reviews
router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

// Get a specific review by ID
router.get("/:reviewId", async (req, res, next) => {
    try {
        const review = await getReview(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

// Create a new review
router.post("/", async (req, res, next) => {
    try {
        const newReview = await createReview(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

// Update a review by ID
router.patch("/:reviewId", async (req, res, next) => {
    try {
        const updatedReview = await updateReview(req.params.reviewId, req.body);
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
});

// Delete a review by ID
router.delete("/:reviewId", async (req, res, next) => {
    try {
        await deleteReview(req.params.reviewId);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
