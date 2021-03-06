const path = require("path");

require("dotenv").config();

const {
  LOCAL_DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DEV_DATABASE_URL = "postgres://anwibkzf:Q87kaEaeJ6Y3qaeLqZi0C06QywPvJaAj@chunee.db.elephantsql.com/anwibkzf",
  PROD_DATABASE_URL,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DEV_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: PROD_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
