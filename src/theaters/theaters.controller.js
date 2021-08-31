const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**************************** CRUDL Operation Handlers ****************************/
async function list(req, res, next) {
  // If there is a movie on res.locals, destruct it's ID, otherwise it's an empty object
  const { movie: { movie_id = null } = {} } = res.locals;
  const data = await service.list(movie_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
