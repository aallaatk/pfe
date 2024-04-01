// routes/tours.js

import { Router } from 'express';
const router = Router();
import Tour from '../models/tour.js';

// POST /api/tours
router.post('/', async (req, res) => {
  try {
    const { tourname, creator, date, price, image, description, attendees,location,duration } = req.body;

    // Create a new tour object
    const newTour = new Tour({
      tourname,
      creator,
      date,
      price,
      image,
      description,
      attendees,
      location,
      duration
    });

    await newTour.save();

    res.status(201).json({ message: 'Tour created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
