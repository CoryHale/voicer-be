const db = require('../data/dbConfig.js');

const addClientProfile = async (profile) => {
    return await db('clientProfiles').insert(profile)
}

const updateClientProfile = async (clientId, profileData) => {
    try {
        const checkForProfile = await db('clientProfiles').where({ clientId });
        if (!(checkForProfile)) return null;
        
        const updatedProfile = await db('clientProfiles').where({ clientId }).update(profileData);
        if (!(updatedProfile)) return null;

        const selectUpdatedProfile = await db('clientProfiles').where({ clientId });
        if (!(selectUpdatedProfile)) return null;

        return selectUpdatedProfile;
    }
    catch (err) {
        return err.message;
    }
}

const deleteClientProfile = async (clientId) => {
    try{
        
        const selectedProfile = await db('clientProfiles').where({ clientId }).first();
        if (!(selectedProfile)) return null;

        const deletedProfile = await db('clientProfiles').where({ clientId }).del();
        if (!(deletedProfile)) return null;
        
        return selectedProfile;

    }
    catch (err) {
        return err.message;
    }
}

const getClientProfiles = _ => {
    return db('clientProfiles');
}

const getClientProfileById = async (clientId) => {
  try{
      const selectedProfile = await db('clientProfiles').where({ clientId }).first();
      return (selectedProfile) ? selectedProfile : null;
  }
  catch {
      return null;
  }
}

const getClientProfileByUserId = async (userId) => {
    try{
        const selectedProfile = await
        db('users as usr')
        .join('clientProfiles as cliPro', 'usr.userId', '=', 'cliPro.userId')
        .select('usr.userId', 'usr.username', 'usr.userType', 'usr.email', 'usr.firstName', 'usr.lastName', 'cliPro.clientId', 'cliPro.companyName')
        .where({ userId: userId } )
        return (selectedProfile) ? selectedProfile : null;
    }
    catch {
        return null;
    }
}

module.exports = {
    addClientProfile,
    updateClientProfile,
    deleteClientProfile,
    getClientProfiles,
    getClientProfileById,
    getClientProfileByUserId
}