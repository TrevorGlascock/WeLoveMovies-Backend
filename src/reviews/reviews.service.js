const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const tableName = "reviews";

/**************************** Specialized Knex Queries ****************************/
const criticConfig = {
  critic_id: "critic.criticId",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
};

const appendCritic = mapProperties(criticConfig);
//TODO: structure isn't quite right, review this later

function readWithCritic(review_id) {
  return db({ r: tableName })
    .join({ c: "critics" }, "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id })
    .first()
    .then(appendCritic);
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
};
