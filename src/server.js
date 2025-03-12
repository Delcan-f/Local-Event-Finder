const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

let databaseUrl = "";
switch (process.env.NODE_ENV?.toLocaleLowerCase()) {
    case "test":
        databaseUrl = "mongodb://localhost:27017/Local-Event-Finder-test";
        break;

    case "dev":
    case "development":
        databaseUrl = "mongodb://localhost:27017/Local-Event-Finder-dev"
        break;

    case "production":
    case "prod":
        databaseUrl = process.env.DATABASE_URL;
        break;

    default:
        console.error("Incorrect environment detected!");
        process.exit();
}

const { connect } = require("./database.js");
if (process.env.NODE_ENV !== "test"){
    connect(databaseUrl);
}

module.exports = { app }