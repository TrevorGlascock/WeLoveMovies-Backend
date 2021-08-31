const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// PUT & DELETE /reviews/:reviewId
router
  .route("/:reviewId([0-9]+)")
  .delete(controller.delete)
  .put(controller.update)
  .all(methodNotAllowed);

// GET /reviews lists all reviews
router.route("/").all(methodNotAllowed);

module.exports = router;
