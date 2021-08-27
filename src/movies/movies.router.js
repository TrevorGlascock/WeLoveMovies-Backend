const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// GET /movies?is_showing=true = > List of all movies currently found in theaters table
router
  .route("/?is_showing=true")
  .get(controller.listShowing)
  .all(methodNotAllowed);

// GET /movies => List of all movies
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
