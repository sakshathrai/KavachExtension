const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');

// Create feedback
router.post('/', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more routes for updating and deleting feedback

module.exports = router;
