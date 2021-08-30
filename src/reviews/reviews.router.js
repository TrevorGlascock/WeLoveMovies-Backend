const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// PUT & DELETE /reviews/:reviewId
router.route("/:reviewId([0-9]+)").get(controller.read).all(methodNotAllowed);

// GET /reviews lists all reviews
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
