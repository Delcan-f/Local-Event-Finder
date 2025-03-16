const express = require("express");
const router = express.Router();

const userRouter = require("./UserRoutes");
const eventRouter = require("./EventRoutes");
const bookingRouter = require("./BookingRoutes");
const reviewRouter = require("./ReviewRoutes");
const locationRouter = require("./LocationRoutes");

// Middleware for logging requests
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// API routes
router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/bookings", bookingRouter);
router.use("/reviews", reviewRouter);
router.use("/locations", locationRouter);

// Root route
router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
});

// Catch-all route for undefined endpoints
router.all("*", (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
});

module.exports = router;
