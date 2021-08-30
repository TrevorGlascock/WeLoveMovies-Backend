const db = require("../db/connection");
const tableName = "movies";

/**************************** CRUDL Knex Queries ****************************/
function list(is_showing = false) {
  //This needs testing
  return is_showing
    ? // List all currently showing movies
      db({ m: tableName })
        .join({ mt: "movies_theaters" }, "mt.movie_id", "m.movie_id")
        .where({ "mt.is_showing": true })
        .select("m.*")
    : // List all Movies
      db(tableName).select("*");
}

function read(movie_id) {
  return db(tableName).select("*").where({ movie_id }).first();
}

module.exports = {
  read,
  list,
};
