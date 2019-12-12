const express = require('express');
const router = express.Router();

const Reviews = require('./reviewModel.js');

// Add review
router.post('/review', async (req, res) => {
    const reviewData = req.body;
    
    try {
        await Reviews.addReview(reviewData);
        res.status(201).json({message: "Added review"})
    }
    catch(error) {
        res.status(500).json({message: "Review could not be added", error: error})
    }
})

// Update review
router.put('/review/:id', async (req, res) => {
    const reviewData = req.body;
    const { id } = req.params;
    
    try {
        const updatedReview = await Reviews.updateReview(id, reviewData);
        res.status(201).json(updatedReview)
    }

    catch(error) {
        res.status(500).json({message: "Review could not be added", error: error})
    }
})

// Delete review
router.delete('/review/:id', async (req, res) => {
    const reviewData = req.body;
    const { id } = req.params;
    
    try {
        const deletedReview = await Reviews.deleteReview(id);
    
        if (deletedReview) {
          res.status(201).json(deletedReview);
        }
        else {
          res.status(404).json({ message: 'Could not delete review' });
        }
      }
})

// Get review by id
router.get('/review/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const selectedReview = await Reviews.getReviewById(id);
  
      if (selectedReview) {
        res.json(selectedReview);
      } else {
        res.status(404).json({ message: 'Could not find review.' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Could not find review.' });
    }
  });