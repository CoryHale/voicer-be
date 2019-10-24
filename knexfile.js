module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_Host,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DEVELOPMENT
    },
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
      directory: './data/seeds/staging'
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
      directory: './data/seeds/production'
    },
    useNullAsDefault: true
  },
  
  test: "jest --watch --verbose",
    testing: {
      client: 'pg',
      connection: {
        host: process.env.DB_Host,
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