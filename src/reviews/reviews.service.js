const db = require("../db/connection");
const tableName = "reviews";

/**************************** Specialized Knex Queries ****************************/
function readAppendCritic() {
  return db({ r: tableName })
    .join({ c: "critics" }, "r.critic_id", "c.critic_id")
    .groupBy("r.rating_id")
    .select("*");
}

/**************************** CRUDL Knex Queries ****************************/
function update(review) {
  const { review_id } = review;
  console.log(review_id);
  return db(tableName).select("*").where(review_id).update(review, "*");
}

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
  read,
  delete: destroy,
  update,
  readAppendCritic,
};
