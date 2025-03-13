const express = require("express");
const { connect } = require("./database");
const mainRouter = require("./routes/MainRouter");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database (except in test environments)
if (process.env.NODE_ENV !== "test") {
    connect();
}

// Use the main router
app.use("/api", mainRouter);

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

module.exports = { app };