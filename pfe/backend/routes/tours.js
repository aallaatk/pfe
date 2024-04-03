import express from 'express';
import Tour from '../models/tour.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { tourname, creator, date, price, description, attendees, location, duration } = req.body;

    // Assuming you have the image file attached in the request body as 'image'
    const image = req.body.image ? req.body.image.path : null; // Access the uploaded image file path

    // Parse date string into a JavaScript Date object
    const parsedDate = new Date(date);

    // Create a new tour object with the parsed date and other extracted data
    const newTour = new Tour({
      image,
      tourname,
      creator,
      date: parsedDate,
      price,
      description,
      attendees,
      location,
      duration,
    });

    await newTour.save();

    res.status(201).json({ message: 'Tour created successfully', tour: newTour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
