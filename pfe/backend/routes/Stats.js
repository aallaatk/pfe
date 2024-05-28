import express from 'express';
import Tour from '../models/tour.js';
import User from '../models/user.js';
import Site from '../models/site.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        // Get total number of users
        const totalUsers = await User.countDocuments();
        // Get total number of guiders
        const totalGuiders = await User.countDocuments({isGuider:true})
        // Get total number of tours
        const totalTours = await Tour.countDocuments();
        const totalSites = await Site.countDocuments();
       
        // Prepare the statistics object
        const stats = {
            tours: totalTours,
            users: totalUsers,
            sites: totalSites, // Add logic to fetch number of sites if applicable
            guiders: totalGuiders, // Add logic to fetch number of guiders if applicable
        };
        // Send the statistics as JSON response
        res.json(stats);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to get new users per day
router.get('/users/stats/new-users-per-day', async (req, res) => {
  try {
    const users = await User.find({ isGuider: false });
    const userCountsPerDay = users.reduce((acc, user) => {
      const registrationDate = new Date(user.createdAt).toISOString().split('T')[0];
      acc[registrationDate] = (acc[registrationDate] || 0) + 1;
      return acc;
    }, {});
    
    const formattedResponse = Object.entries(userCountsPerDay).map(([date, count]) => ({ date, count }));
    
    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error fetching new users per day:', error); // Log detailed error
    res.status(500).json({ message: 'Error fetching new users per day' }); // Send generic error response
  }
});

// Route to get new guiders per day
router.get('/guiders/stats/new-guiders-per-day', async (req, res) => {
  try {
    const guiders = await User.find({ isGuider: true });
    const guiderCountsPerDay = guiders.reduce((acc, guider) => {
      const registrationDate = new Date(guider.createdAt).toISOString().split('T')[0];
      acc[registrationDate] = (acc[registrationDate] || 0) + 1;
      return acc;
    }, {});
    
    const formattedResponse = Object.entries(guiderCountsPerDay).map(([date, count]) => ({ date, count }));
    
    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error fetching new guiders per day:', error); // Log detailed error
    res.status(500).json({ message: 'Error fetching new guiders per day' }); // Send generic error response
  }
});
// Route to get all tours created per day
router.get('/tours/stats/tours-created-per-day', async (req, res) => {
  try {
    const tours = await Tour.find(); // Find all tours

    // Group tours by creation date and count tours created per day
    const tourCountsPerDay = tours.reduce((acc, tour) => {
      const creationDate = new Date(tour.createdAt).toISOString().split('T')[0];
      acc[creationDate] = (acc[creationDate] || 0) + 1;
      return acc;
    }, {});

    // Format the response as an array of objects with date and count properties
    const formattedResponse = Object.entries(tourCountsPerDay).map(([date, count]) => ({ date, count }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error retrieving tours created per day:', error);
    res.status(500).json({ message: 'Failed to retrieve tours created per day' });
  }
});

// Route to get all sites created per day
router.get('/sites/stats/sites-created-per-day', async (req, res) => {
  try {
    const sites = await Site.find(); // Find all sites

    // Group sites by creation date and count sites created per day
    const siteCountsPerDay = sites.reduce((acc, site) => {
      const creationDate = new Date(site.createdAt).toISOString().split('T')[0];
      acc[creationDate] = (acc[creationDate] || 0) + 1;
      return acc;
    }, {});

    // Format the response as an array of objects with date and count properties
    const formattedResponse = Object.entries(siteCountsPerDay).map(([date, count]) => ({ date, count }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error retrieving sites created per day:', error);
    res.status(500).json({ message: 'Failed to retrieve sites created per day' });
  }
});


export default router;
