const db = require('../data/dbConfig.js');

module.exports = {
    addUser
}

async function addUser(user) {
    return await db('users').insert(user)
}
