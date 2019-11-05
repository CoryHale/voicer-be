const db = require('../data/dbConfig.js');

const addTalentProfile = async profile => {
  return await db('talentProfiles').insert(profile);
};

const updateTalentProfile = async (talentId, profileData) => {
  try {
    const checkForProfile = await db('talentProfiles').where({ talentId });
    if (!checkForProfile) return null;

    const updatedProfile = await db('talentProfiles')
      .where({ talentId })
      .update(profileData);
    if (!updatedProfile) return null;

    const selectUpdatedProfile = await db('talentProfiles').where({ talentId });
    if (!selectUpdatedProfile) return null;

    return selectUpdatedProfile;
  } catch (err) {
    return err.message;
  }
};

const deleteTalentProfile = async talentId => {
  try {
    const selectedProfile = await db('talentProfiles')
      .where({ talentId })
      .first();
    if (!selectedProfile) return null;

    const deletedProfile = await db('talentProfiles')
      .where({ talentId })
      .del();
    if (!deletedProfile) return null;

    return selectedProfile;
  } catch (err) {
    return err.message;
  }
};

const getTalentProfiles = _ => {
  return db('talentProfiles');
};

const getTalentProfileById = async talentId => {
  try {
    const selectedProfile = await db('talentProfiles')
      .where({ talentId })
      .first();
    return selectedProfile ? selectedProfile : null;
  } catch {
    return null;
  }
};

const getTalentProfileByUserId = async userId => {
  try {
    const selectedProfile = await db('users as usr')
      .join('talentProfiles as talPro', 'usr.userId', '=', 'talPro.userId')
      .select(
        'usr.userId',
        'usr.username',
        'usr.userType',
        'usr.email',
        'usr.firstName',
        'usr.lastName',
        'talPro.clientId',
        'talPro.companyName'
      );

    return selectedProfile ? selectedProfile : null;
  } catch {
    return null;
  }
};

const getLanguages = () => {
  return db('languages');
};

async function addLanguage(language) {
  return await db('languages')
    .insert(language)
    .then(async () => {
      return await db('languages');
    });
}

const updateLanguage = async (languageId, languageUpdate) => {
  try {
    const langCheck = await db('languages').where({ languageId });
  } catch (err) {
    return err;
  }
};

module.exports = {
  addTalentProfile,
  updateTalentProfile,
  deleteTalentProfile,
  getTalentProfiles,
  getTalentProfileById,
  getTalentProfileByUserId,
  getLanguages,
  addLanguage,
  updateLanguage
};
