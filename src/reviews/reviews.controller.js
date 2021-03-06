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
async function update(req, res, next) {
  const { review } = res.locals;
  const { score, content } = req.body.data;
  const newReview = { ...review, score, content };
  await service.update(newReview);

  const data = await service.readWithCritic(review.review_id);

  res.json({ data });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

async function list(req, res, next) {
  const { movie: { movie_id = null } = {} } = res.locals;
  // movie_id is truthy ? list just the reviews for that movie  : Otherwise list all reviews
  const data = movie_id
    ? await service.listFromMovie(movie_id)
    : await service.list();
  res.json({ data });
}

module.exports = {
  delete: [asyncErrorBoundary(hasReviewId), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(hasReviewId), asyncErrorBoundary(update)],
  list: asyncErrorBoundary(list),
};
