const db = require('../data/dbConfig.js');

const addUser = async (job) => {
    return await db('users').insert(job)
}

const updateUser = async (userId, newData) => {
    try {
        const checkForUser = await db('users').where({ userId });
        if (!(checkForUser)) return null;
        
        const updatedUser = await db('users').where({ userId }).update(newData);
        if (!(updatedUser)) return null;

        const selectUpdatedUser = await db('users').where({ userId });
        if (!(selectUpdatedUser)) return null;

        return selectUpdatedUser;
    }
    catch (err) {
        return err.message;
    }
}

const deleteUser = async (userId) => {
    try{
        
        const selectedUser = await db('users').where({ userId }).first();
        if (!(selectedUser)) return null;

        const deletedUser = await db('users').where({ userId }).del();
        if (!(deletedUser)) return null;
        
        return selectedUser;

    }
    catch (err) {
        return err.message;
    }
}

const getUsers = _ => {
    return db('users');
}

const getUserById = async (userId) => {
  try{
      const selectedUser = await db('users').where({ userId }).first();
      return (selectedUser) ? selectedUser : null;
  }
  catch {
      return null;
  }
}

async function findBy(username) {
  return await db('users').where(username).first();
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
}
