const router = require("express").Router({ mergeParams: true });
const controller = require("./movieId.controller");
const theatersRouter = require("../../theaters/theaters.router");
const methodNotAllowed = require("../../errors/methodNotAllowed");

// GET /movies/:movieId/theaters
router.use("/theaters", theatersRouter);

// GET /movies/:movieId/reviews
router.route("/reviews").get(controller.listReviews).all(methodNotAllowed);

// GET /movies/:movieId/
router.route("/").get(controller.read).all(methodNotAllowed);

module.exports = router;
