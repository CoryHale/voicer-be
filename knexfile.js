require('dotenv').config();

module.exports = {
  // The development and testing environments will be hosted on your local machine. Create a .env file and set the 5 connection variable values:
  //  DB_HOST - Your local server. Will probably be either localhost or 127.0.0.1
  //  DB_USER - Your username for postgresql
  //  DB_PASSWORD - Your password for postgresql
  //  DB_DEVELOPMENT - The name of your database for your development environment
  //  DB_TESTING - The name of your database for your testing environment

  development: {
    client: 'pg',

    // example of DATABASE_URL to put in .env
    // "postgres://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_DEVELOPMENT"
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/development'
    },
    useNullAsDefault: true
  },

  //The staging and production environments are hosted in Heroku. Heroku has an extension for postgresql that we've added to the production and staging Heroku apps.
  //In the settings of the Heroku apps, there is a config var called DATABASE_URL that we're using to connect the Heroku postgresql database.
  //There is a second config var called node_env that is being used in the dbConfig file to tell Heroku which environment to use.

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/development'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/development'
    },
    useNullAsDefault: true
  },
  
  testing: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_TESTING
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/production'
    },
    useNullAsDefault: true
  }
};

