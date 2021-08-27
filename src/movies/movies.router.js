const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// GET /movies/:movieId
router
  .route("/:movieId([0-9]+)")
  .get(controller.read)
  .all(methodNotAllowed);

// GET /movies => List of all movies (may have an is_showing query)
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
