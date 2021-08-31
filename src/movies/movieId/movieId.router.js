const router = require("express").Router({ mergeParams: true });
const controller = require("./movieId.controller");
const theatersRouter = require("../../theaters/theaters.router");
const reviewsRouter = require("../../reviews/reviews.router");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// GET /movies/:movieId/reviews
router.use("/reviews", reviewsRouter);

// GET /movies/:movieId/theaters
router.use("/theaters", theatersRouter);

// GET /movies/:movieId/
router.route("/").get(controller.read).all(methodNotAllowed);

module.exports = router;
