const express = require('express');
const router = express.Router();

const TalentProfiles = require('./talentProfileModel.js');

// /api/talents endpoint

// FIXME: Add auth for all endpoints and verify user is the owner

// Insert talent profile into db
router.post('/', async (req, res) => {
  const profileData = req.body;

  try {
    await TalentProfiles.addTalentProfile(profileData);
    res.status(201).json({ message: 'Added talent profile.' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not add talent profile', error: error });
  }
});

// Update existing talent profile
router.put('/profile/:id', async (req, res) => {
  const profileData = req.body;
  const { id } = req.params;

  try {
    const updatedData = await TalentProfiles.updateTalentProfile(
      id,
      profileData
    );
    res.status(201).json(updatedData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Talent profile could not be updated', error: error });
  }
});

// Remove talent profile
router.delete('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfile = await TalentProfiles.deleteTalentProfile(id);

    if (deletedProfile) {
      res.status(201).json(deletedProfile);
    } else {
      res.status(404).json({ message: 'Could not delete talent profile.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not delete talent profile.', error: error });
  }
});

// Get all talent profiles
router.get('/', async (req, res) => {
  try {
    const talentProfiles = await TalentProfiles.getTalentProfiles();
    res.json(talentProfiles);
  } catch (err) {
    res.status(500).json({ message: 'Could not find talent profiles' });
  }
});

// Get talent profile by user id
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const selectedTalentProfile = await TalentProfiles.getTalentProfileByUserId(
      id
    );

    if (selectedTalentProfile) {
      res.json(selectedTalentProfile);
    } else {
      res.status(404).json({ message: 'Could not find talent profile.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not find talent profile.' });
  }
});

// Add allowed languages
router.post('/languages', async (req, res) => {
  try {
    const language = await TalentProfiles.addLanguage(req.body);
    res.status(201).json(language);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error adding the language' });
  }
});

//Get added languages
router.get('/languages', async (req, res) => {
  try {
    const languages = await TalentProfiles.getLanguages();
    res.status(200).json(languages);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: 'There was an error retrieving languages' });
  }
});

//UPDATE language

//DELETE languages

router.delete('/languages/:id', async (req, res) => {
  try {
    const deleted = await TalentProfiles.deleteLanguage(req.params.id);
    console.log(deleted);
    res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting language' });
  }
});

//ADD accent

router.post('/accents', async (req, res) => {
  try {
    const accent = await TalentProfiles.addAccent(req.body);
    res.status(201).json(accent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error adding the accents' });
  }
});

//GET accents

router.get('/accents', async (req, res) => {
  try {
    const accents = await TalentProfiles.getAccents();
    res.status(200).json(accents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error retrieving accents' });
  }
});

//DELETE accent

router.delete('/accents/:id', async (req, res) => {
  try {
    const deleted = await TalentProfiles.deleteAccent(req.params.id);
    console.log(deleted);
    res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting accent' });
  }
});

//ADD language to user

router.post('/talentLanguage', async (req, res) => {
  try {
    const talentLang = await TalentProfiles.addTalentLang(req.body);
    res.status(200).json({ message: 'Language added to User' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error adding Language to User' });
  }
});

//Get all languages assigned to users

router.get('/talentLanguage', async (req, res) => {
  try {
    const talentLanguage = await TalentProfiles.getTalentLang();
    res.status(200).json(talentLanguage);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving talent languages' });
  }
});

//DELETE language added to user
router.delete('/talentLanguage/:id', async (req, res) => {
  try {
    const deleted = await TalentProfiles.deleteTalentLang(req.params.id);
    console.log(deleted);
    res.status(200).json({ message: 'Language removed from user' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error removing Languge from user' });
  }
});

//GET Talents tied to Users

router.get('/talentAccent', async (req, res) => {
  try {
    const talentAccent = await TalentProfiles.getTalentAccent();
    res.status(200).json(talentAccent);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving talent accents' });
  }
});

//ADD accent to user

router.post('/talentAccent', async (req, res) => {
  try {
    const talentAccent = await TalentProfiles.addTalentAccent(req.body);
    res.status(200).json(talentAccent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error adding Accent to User' });
  }
});

//DELETE accent from user
router.delete('/talentAccent/:id', async (req, res) => {
  try {
    const talentAccent = await TalentProfiles.deleteTalentAccent(req.params.id);
    res.status(200).json({ message: 'Accent Deleted from User' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting Accent from User' });
  }
});

module.exports = router;
