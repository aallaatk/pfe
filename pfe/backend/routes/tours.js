import express from 'express';
import Tour from '../models/tour.js';
import mongoose from "mongoose";
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

  // Check if 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

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
// DELETE route to delete a specific tour by ID
router.delete('/api/tours/:id', async (req, res) => {
  const { id } = req.params;

  // Check if 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({ message: 'Tour deleted successfully', deletedTour });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({ message: 'Failed to delete tour' });
  }
});
// PUT route to update a specific tour by ID
router.put('/api/tours/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTourData = req.body;

  // Check if 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  try {
    const existingTour = await Tour.findById(id);

    if (!existingTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Update tour fields based on the provided data
    Object.assign(existingTour, updatedTourData);

    const updatedTour = await existingTour.save();

    res.status(200).json(updatedTour);
  } catch (error) {
    console.error('Error updating tour:', error);
    res.status(500).json({ message: 'Failed to update tour' });
  }
});

export default router;
