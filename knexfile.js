module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/voicerDB',
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
    client: 'postgresql',
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
    client: 'postgresql',
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
      client: 'postgresql',
      connection: 'postgres://localhost/voicerTest',
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds/production'
      },
      useNullAsDefault: true
    }
};
