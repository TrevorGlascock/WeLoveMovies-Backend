const db = require("../db/connection");
const tableName = "reviews";

/**************************** CRUDL Knex Queries ****************************/
function read(review_id) {
  return db(tableName).select("*").where({ review_id }).first();
}

function destroy(review_id) {
  return db(tableName).where({ review_id }).del();
}

function list() {
  return db(tableName).select("*");
}

module.exports = {
  list,
  delete: destroy,
};
