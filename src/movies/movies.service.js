const db = require("../db/connection");
const tableName = "movies";

/**************************** CRUDL Knex Queries ****************************/
function list(is_showing = false) {
  //TODO: need to account for the query
  return db(tableName).select("*");
}

function read(movie_id) {
  return db(tableName).select("*").where({ movie_id }).first();
}

module.exports = {
  read,
  list,
};
