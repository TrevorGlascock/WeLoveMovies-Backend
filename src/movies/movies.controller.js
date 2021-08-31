const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**************************** CRUDL Operation Handlers ****************************/
async function list(req, res, next) {
  // If the query is present and true, use the NowShowing version from the service
  const data = req.query.is_showing
    ? await service.listNowShowing()
    : await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
