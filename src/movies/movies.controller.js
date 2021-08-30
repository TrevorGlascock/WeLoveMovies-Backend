const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
async function list(req, res, next) {
  // If the query is present and true, use the NowShowing version from the service
  const data = req.query.is_showing
    ? await service.listNowShowing()
    : await service.list();
  res.json({ data });
}

async function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(hasMovieId), read],
};
