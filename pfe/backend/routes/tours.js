import express from 'express';
import Tour from '../models/tour.js';

const router = express.Router();

// GET route to retrieve all tours
router.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error retrieving tours:', error);
    res.status(500).json({ message: 'Failed to retrieve tours' });
  }
});

// GET route to retrieve a specific tour by ID
router.get('/api/tours/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json(tour);
  } catch (error) {
    console.error('Error retrieving tour by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve tour' });
  }
});

// POST route to create a new tour
router.post('/api/tours/create', async (req, res) => {
  const newTourData = req.body;

  try {
    const newTour = await Tour.create(newTourData);
    res.status(201).json(newTour);
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({ message: 'Failed to create tour' });
  }
});

export default router;
