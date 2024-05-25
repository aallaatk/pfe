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

export default router;
