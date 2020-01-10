const express = require('express');
const router = express.Router();

const Jobs = require('./jobModel.js');
const JobOffers = require('../jobOffers/jobOfferModel.js');
const Users = require('../users/userModel.js');
const TalentProfiles = require('../talentProfiles/talentProfileModel.js');
const ClientProfiles = require('../clientProfiles/clientProfileModel.js');

// /api/jobs endpoint

// FIXME: Add auth for all endpoints and verify user is the owner of the job

// Insert job into db
router.post('/', async ( req, res ) => {
    const jobData = req.body;
    try {
        await Jobs.addJob(jobData);
        res.status(201).json({message: "Added job!"})
    }
    catch(error) {
        res.status(500).json({message: "Job could not be added", error: error})
    }
})

// Update existing job
router.put('/:id', async ( req, res ) => {
    const jobData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await Jobs.updateJob(id, jobData);
        res.status(201).json(updatedData)
    }
    catch(error) {
        res.status(500).json({message: "Job could not be updated", error: error})
    }
})

// Remove job from db
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedJob = await Jobs.deleteJob(id);
  
      if (deletedJob) {
        res.status(201).json(deletedJob);
      }
      else {
        res.status(404).json({ message: 'Could not delete job' });
      }
    }
    
    catch (error) {
      res.status(500).json({ message: 'Could not delete job', error: error });
    }
});

// Get all jobs
router.get('/', async (req, res) => {

  try {
    const jobs = await Jobs.getJobs();
    res.json(jobs);
  }
  catch (err) {
    res.status(500).json({ message: 'Could not find jobs' });
  }
});


// Get job by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const selectedJob = await Jobs.getJobById(id);

    if (selectedJob) {
      res.json(selectedJob);
    } else {
      res.status(404).json({ message: 'Could not find job.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not find job.' });
  }
});

// Complete a job, and change it's most recent job offer to completed
router.put('/complete/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const offers = (await JobOffers.getJobOffersByJobId(id))
      .filter(offer => offer.status.toLowerCase() !== 'open' || offer.status.toLowerCase !== 'declined')
      .reverse()
    await Jobs.updateJob(id, {status: "Completed"})
    await JobOffers.updateJobOffer(offers[0].jobOfferId, {status: "Completed", completedDate: new Date()})
    const client = await ClientProfiles.getClientProfileById(offers[0].clientId)
    const talent = await TalentProfiles.getTalentProfileById(offers[0].talentId)
    if(client[0].completedJobs+1 <= 9) {
      clientLoyalty = 1
    } else if(10 <= client[0].completedJobs+1 <= 24) {
      clientLoyalty = 2
    } else if(client[0].completedJobs+1 >= 25) {
      clientLoyalty = 3
    }
    if(talent[0].completedJobs+1 <= 9) {
      talentLoyalty = 1
    } else if(10 <= talent[0].completedJobs+1 <= 24) {
      talentLoyalty = 2
    } else if(talent[0].completedJobs+1 >= 25) {
      talentLoyalty = 3
    }
    let talentFee = talent[0].loyaltyLevel === 1 ? 0.1 : 
            talent[0].loyaltyLevel === 2 ? 0.075 : 0.05
    let talentBalance = parseFloat(talent[0].accountBalance) + parseFloat((offers[0].price - (offers[0].price * talentFee)))
    await Users.updateUser(client[0].userId, {
      completedJobs: client[0].completedJobs+1,
      loyaltyLevel: clientLoyalty
    })
    await Users.updateUser(talent[0].userId, {
      completedJobs: talent[0].completedJobs+1,
      loyaltyLevel: talentLoyalty,
      accountBalance: talentBalance
    })
    const admin = await Users.getUserById(5)
    console.log(admin, parseFloat(offers[0].price * talentFee))
    await Users.updateUser(5, {
      accountBalance: parseFloat(admin.accountBalance) + parseFloat(offers[0].price * talentFee)
    })
    res.status(200).json({message: 'Successfully completed job ' + id + ' and it\'s related offer'})
  } catch(error) {
    res.status(500).json({ message: 'Error occured while completing job - ' + error.message})
  }
})

module.exports = router;
