const db = require("../db/connection");
const tableName = "theaters";

/**************************** CRUDL Knex Queries ****************************/
function list() {
  // TODO Returns a list of all theaters with appropriate movies embedded
  return db(tableName).select("*");
}

module.exports = {
  list,
};
