if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const routeNotFound = require("./errors/routeNotFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());

app.use(express.json());

app.use("/movies", moviesRouter);

// Commented out until routes are set up
// app.use("/reviews", reviewsRouter);
// app.use("/theaters", theatersRouter);

app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;
