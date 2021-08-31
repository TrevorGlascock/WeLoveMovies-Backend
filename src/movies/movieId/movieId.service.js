const db = require("../../db/connection");
const tableName = "movies";

/**************************** CRUDL Knex Queries ****************************/
function read(movie_id) {
  return db(tableName).select("*").where({ movie_id }).first();
}

module.exports = {
  read,
};
