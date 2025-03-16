const express = require("express");
const { connect } = require("./database");
const mainRouter = require("./routes/MainRouter");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "test") {
    connect();
}

app.use("/api", mainRouter);

app.use(errorHandler);

module.exports = { app };