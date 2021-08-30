const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**************************** Middleware Functions ****************************/
async function hasReviewId(req, res, next) {
  const { reviewId } = req.params; // Pull the id from the request parameter
  const review = await service.read(reviewId); // Let the service find the movie

  // If no review is found, then throw an error
  if (!review) return next({ status: 404, message: `Review cannot be found.` });

  // Otherwise, set the local variable and proceed through the pipeline
  res.locals.review = review;
  return next();
}

/**************************** CRUDL Operation Handlers ****************************/
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
