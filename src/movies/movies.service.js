const db = require("../db/connection");
const tableName = "movies";

/**************************** Specialized Knex Queries ****************************/
function listNowShowing() {
  return db({ m: tableName })
    .join({ mt: "movies_theaters" }, "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id")
    .select("m.*");
}

/**************************** CRUDL Knex Queries ****************************/
function list() {
  return db(tableName).select("*");
}

module.exports = {
  list,
  listNowShowing,
};
