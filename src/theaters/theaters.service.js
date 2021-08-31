const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const originTable = "theaters";
const configTable = "movies";

/**************************** Reduce Movies Configuration ****************************/
const moviesConfig = {
  movie_id: [configTable, null, "movie_id"],
  title: [configTable, null, "title"],
  runtime_in_minutes: [configTable, null, "runtime_in_minutes"],
  rating: [configTable, null, "rating"],
  description: [configTable, null, "description"],
  image_url: [configTable, null, "image_url"],
  created_at: [configTable, null, "created_at"],
  updated_at: [configTable, null, "updated_at"],
  is_showing: [configTable, null, "is_showing"],
  theater_id: [configTable, null, "theater_id"],
};

const reduceMovies = reduceProperties("theater_id", moviesConfig);

/**************************** CRUDL Knex Queries ****************************/
function list(movie_id) {
  // TODO Returns a list of all theaters with appropriate movies embedded
  let pgQuery = db({ t: originTable })
    .join({ mt: "movies_theaters" }, "t.theater_id", "mt.theater_id")
    .join({ m: configTable }, "mt.movie_id", "m.movie_id")
    .select("*");

  // if a movie_id is provided, then filter by it
  if (movie_id) pgQuery = pgQuery.where("m.movie_id", movie_id);

  return pgQuery.then(reduceMovies);
}

module.exports = {
  list,
};
