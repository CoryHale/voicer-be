const express = require('express');
const router = express.Router();

const ClientProfiles = require('./clientProfileModel.js');

// /api/clients endpoint

// FIXME: Add auth for all endpoints and verify user is the owner of the job

// Insert client profile into db
router.post('/', async ( req, res ) => {
    const profileData = req.body;
    
    try {
        await ClientProfiles.addClientProfile(profileData);
        res.status(201).json({message: "Added client profile."})
    }
    catch(error) {
        res.status(500).json({message: "Could not add client profile", error: error})
    }
})

// Update existing client profile
router.put('/:id', async ( req, res ) => {
    const profileData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await ClientProfiles.updateClientProfile(id, profileData);
        res.status(201).json(updatedData)
    }
    catch(error) {
        res.status(500).json({message: "Job offer could not be updated", error: error})
    }
})

// Remove client profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedJobOffer = await JobOffers.deleteJobOffer(id);
  
      if (deletedJobOffer) {
        res.status(201).json(deletedJobOffer);
      }
      else {
        res.status(404).json({ message: 'Could not delete job offer' });
      }
    }
    
    catch (error) {
      res.status(500).json({ message: 'Could not delete job offer', error: error });
    }
});

// Get all client profiles
router.get('/', async (req, res) => {
  try {
    const clientProfiles = await ClientProfiles.getClientProfiles();
    res.json(clientProfiles);
  }
  catch (err) {
    res.status(500).json({ message: 'Could not find client profiles' });
  }
});

// Get client profile by user id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const selectedClientProfile = await ClientProfiles.getClientProfileByUserId(id);

    if (selectedClientProfile) {
      res.json(selectedClientProfile);
    } else {
      res.status(404).json({ message: 'Could not find client profile.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not find client profile.' });
  }
});

module.exports = router;