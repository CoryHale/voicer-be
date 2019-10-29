const db = require('../data/dbConfig.js');

module.exports = {
      findBy,
      addUser
}

async function findBy(username) {
  return await db('users').where(username).first();
}

async function addUser(user) {
  return await db('users').insert(user)
}
