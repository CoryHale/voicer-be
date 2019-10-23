const knex = require('knex');

const config = require('../knexfile.js');

const environment = process.env.node_env || "development";

module.exports = knex(config[environment]);