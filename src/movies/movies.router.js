const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const movieIdRouter = require("./movieId/movieId.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// GET /movies/:movieId
router.use("/:movieId([0-9]+)", movieIdRouter);

// GET /movies => List of all movies (may have an is_showing query)
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
