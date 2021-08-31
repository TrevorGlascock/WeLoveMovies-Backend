const router = require("express").Router({ mergeParams: true });
const controller = require("./movieId.controller");
const theatersRouter = require("../../theaters/theaters.router");
const reviewsRouter = require("../../reviews/reviews.router");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// GET /movies/:movieId/theaters
router.use("/theaters", controller.hasMovieId, theatersRouter);

// GET /movies/:movieId/reviews
router.use("/reviews", controller.hasMovieId, reviewsRouter);

// GET /movies/:movieId/
router.route("/").get(controller.read).all(methodNotAllowed);

module.exports = router;
