const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// GET /theaters lists all theaters with the movies embedded
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
