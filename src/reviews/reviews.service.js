const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const tableName = "reviews";

/**************************** Map Critics Configuration ****************************/
const criticConfig = {
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
};

const appendCritic = mapProperties(criticConfig);

/**************************** Specialized Knex Queries ****************************/

function readWithCritic(review_id) {
  return db({ r: tableName })
    .select("*")
    .join({ c: "critics" }, "r.critic_id", "c.critic_id")
    .where({ review_id })
    .first()
    .then(appendCritic);
}

function listFromMovie(movie_id) {
  return db({ r: tableName })
    .select("*")
    .join({ c: "critics" }, "r.critic_id", "c.critic_id")
    .where({ movie_id })
    .then((data) => data.map(appendCritic));
}

/**************************** CRUDL Knex Queries ****************************/
function update(review) {
  const { review_id } = review;
  return db(tableName).select("*").where({ review_id }).update(review, "*");
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
  readWithCritic,
  listFromMovie,
};
