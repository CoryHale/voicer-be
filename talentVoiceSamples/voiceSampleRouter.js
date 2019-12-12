const express = require('express');
const router = express.Router();

const VoiceSamples = require('./voiceSampleModel.js');

// Add voice sample to db
router.post('/', async (req, res) => {
    const voiceSample = req.body;

    try {
        await VoiceSamples.addVoiceSample(voiceSample);
        res.status(201).json({ message: 'Added voice sample.' });
    } catch (err) {
        res.status(500).json({ message: 'Could not add voice sample', error: error});
    }
});

// Update voice sample
router.put('/:id', async (req, res) => {
    const voiceSample = req.body;
    const { id } = req.params;

    try {
        const updatedSample = await VoiceSamples.updateVoiceSample(
            id,
            voiceSample
        );
        res.status(201).json(updatedSample);
    } catch (err) {
        res.status(500).json({ message: 'Voice sample could not be updated.', error: error });
    }
});

// Delete voice sample
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSample = await VoiceSamples.deleteVoiceSample(id);

        if (deletedSample) {
            res.status(201).json(deletedSample);
        } else {
            res.status(404).json({ message: 'Could not delete voice sample.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Could not delete voice sample.', error: error });
    }
});

// Get all voice samples
router.get('/', async (req, res) => {
    try {
        const voiceSamples = await VoiceSamples.getVoiceSamples();
        res.json(voiceSamples);
    } catch (err) {
        res.status(500).json({ message: 'Could not find voice samples' });
    }
});


// Get voice sample by userId
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const selectedVoiceSamples = await VoiceSamples.getVoiceSamplesByUserId(id);

        if (selectedVoiceSamples) {
            res.json(selectedVoiceSamples);
        } else {
            res.status(404).json({ message: 'Could not find voice samples.' })
        }
    } catch (err) {
        
    }
});

// Get voice samples by Id