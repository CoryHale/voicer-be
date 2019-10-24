const express = require('express');
const router = express.Router();

const Jobs = require('./jobModel.js');

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

module.exports = router;