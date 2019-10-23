const db = require('../data/dbConfig.js');

module.exports = {
      findBy
}

async function findBy(username) {
  return await db('users').where(username);
}

