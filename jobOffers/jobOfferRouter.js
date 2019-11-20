const express = require('express');
const router = express.Router();

const JobOffers = require('./jobOfferModel.js');

// /api/jobs/:jobId/offers endpoint

// FIXME: Add auth for all endpoints and verify user is the owner of the job

// Insert job offer into db
router.post('/:jobId/offers', async ( req, res ) => {
    const jobOfferData = req.body;
    try {
        await JobOffers.addJobOffer(jobOfferData);
        res.status(201).json({message: "Added job offer!"})
    }
    catch(error) {
        res.status(500).json({message: "Job offer could not be added", error: error})
    }
})

// Update existing job offer
router.put('/:jobId/offers/:id', async ( req, res ) => {
    const jobOfferData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await JobOffers.updateJobOffer(id, jobOfferData);
        res.status(201).json(updatedData)
    }
    catch(error) {
        res.status(500).json({message: "Job offer could not be updated", error: error})
    }
})

// Remove job offer from db
router.delete('/:jobId/offers/:id', async (req, res) => {
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

// // Get all job offers
// router.get('/:jobId/offers', async (req, res) => {
//   try {
//     const jobOffers = await JobOffers.getJobOffers();
//     res.json(jobOffers);
//   }
//   catch (err) {
//     res.status(500).json({ message: 'Could not find job offers' });
//   }
// });


// Get all job offers
router.get('/:jobId/offers', async (req, res) => {
  const { jobId } = req.params;
  try {
    const selectedJobOffers = await JobOffers.getJobOffersByJobId(jobId);
    res.status(200).json(selectedJobOffers);
  } catch (err) {
    res.status(500).json({ message: 'Could not find job offers.', error: err});
  }

});

// Get all job offers by talent ID
router.get('/talent/offers', async (req, res) => {
  const { talentId } = req.params;
  try {
    const selectedJobOffers = await JobOffers.getJobOffersByClientId(talentId);
    res.status(200).json(selectedJobOffers);
  } catch (err) {
    res.status(500).json({ message: 'Could not find job offers.' });
  }

});

// Get all job offers by client ID
router.get('/client/offers', async (req, res) => {
  const { clientId } = req.params;
  try {
    const selectedJobOffers = await JobOffers.getJobOffersByTalentId(clientId);
    res.status(200).json(selectedJobOffers);
  } catch (err) {
    res.status(500).json({ message: 'Could not find job offers.' });
  }

});


// Get job offer by id
router.get('/:jobId/offers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const selectedJobOffer = await JobOffers.getJobOfferById(id);

    if (selectedJobOffer) {
      res.json(selectedJobOffer);
    } else {
      res.status(404).json({ message: 'Could not find job offer.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not find job offer.', error: err});
  }
});

module.exports = router;
