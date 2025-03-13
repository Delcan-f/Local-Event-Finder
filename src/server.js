const express = require("express");
const { connect } = require("./database");

const app = express();
app.use(express.json());

// Connect to the database (except in test environments)
if (process.env.NODE_ENV !== "test") {
    connect();
}

module.exports = { app };