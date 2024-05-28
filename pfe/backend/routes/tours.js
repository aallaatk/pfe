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
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    
    const newTour = new Tour({
      ...newTourData,
      createdAt: formattedDate // Capture the current date in the %Y-%m-%d format
    });
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
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

// POST route to book a specific tour by ID
router.post('/api/tours/book/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  // Check if 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid tour ID' });
  }

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Check if tour is already booked by the user
    if (tour.reservedBy.includes(userId)) {
      return res.status(400).json({ message: 'Tour already booked by this user' });
    }

    // Assume `reservedBy` is an array field in the Tour schema
    tour.reservedBy.push(userId);
    await tour.save();

    res.status(200).json({ message: 'Tour booked successfully' });
  } catch (error) {
    console.error('Error booking tour:', error);
    res.status(500).json({ message: 'Failed to book tour' });
  }
});




// GET route to retrieve all tours created by a specific user
router.get('/api/tours/user/:userId', async (req, res) => {
  const { userId } = req.params;

  // Check if 'userId' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const tours = await Tour.find({ creator: userId });
    if (tours.length === 0) {
      return res.status(404).json({ message: 'No tours found for this user' });
    }
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error retrieving tours by user ID:', error);
    res.status(500).json({ message: 'Failed to retrieve tours' });
  }
});
// GET route to retrieve all tours created by a specific guider
router.get('/api/tours/guider/:guiderId', async (req, res) => {
  const { guiderId } = req.params;

  // Check if 'guiderId' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(guiderId)) {
    return res.status(400).json({ message: 'Invalid guider ID' });
  }

  try {
    const tours = await Tour.find({ creator: guiderId });
    if (tours.length === 0) {
      return res.status(404).json({ message: 'No tours found for this guider' });
    }
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error retrieving tours by guider ID:', error);
    res.status(500).json({ message: 'Failed to retrieve tours' });
  }
});

// GET route to retrieve all tours reserved by a specific user
router.get('/api/tours/reserved/:userId', async (req, res) => {
  const { userId } = req.params;

  // Check if 'userId' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const tours = await Tour.find({ reservedBy: userId });
    if (tours.length === 0) {
      return res.status(404).json({ message: 'No tours reserved by this user' });
    }
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error retrieving reserved tours by user ID:', error);
    res.status(500).json({ message: 'Failed to retrieve reserved tours' });
  }
});
// GET route to retrieve all tours reserved by a specific guider
router.get('/api/tours/reserved/guider/:guiderId', async (req, res) => {
  const { guiderId } = req.params;

  // Check if 'guiderId' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(guiderId)) {
    return res.status(400).json({ message: 'Invalid guider ID' });
  }

  try {
    const tours = await Tour.find({ reservedBy: guiderId });
    if (tours.length === 0) {
      return res.status(404).json({ message: 'No tours reserved by this guider' });
    }
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error retrieving reserved tours by guider ID:', error);
    res.status(500).json({ message: 'Failed to retrieve reserved tours' });
  }
});



// GET route to retrieve all tours created per day
router.get('/api/tours/stats', async (req, res) => {
  try {
      const toursCreatedPerDay = await Tour.aggregate([
          {
              $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                  count: { $sum: 1 }
              }
          },
          {
              $project: {
                  _id: 0,
                  date: "$_id",
                  count: 1
              }
          },
          {
              $sort: { date: 1 }
          }
      ]);

      res.status(200).json(toursCreatedPerDay);
  } catch (error) {
      console.error('Error retrieving tours created per day:', error);
      res.status(500).json({ message: 'Failed to retrieve tours created per day' });
  }
});




export default router;
