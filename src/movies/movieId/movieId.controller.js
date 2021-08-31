const service = require("./movieId.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

/**************************** Middleware Functions ****************************/
async function hasMovieId(req, res, next) {
  const { movieId } = req.params; // Pull the id from the request parameter
  const movie = await service.read(movieId); // Let the service find the movie

  // If no movie is found, then throw an error
  if (!movie) return next({ status: 404, message: `Movie cannot be found.` });

  // Otherwise, set the local variable and proceed through the pipeline
  res.locals.movie = movie;
  return next();
}

/**************************** CRUDL Operation Handlers ****************************/
async function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(hasMovieId), read],
  hasMovieId,
};
