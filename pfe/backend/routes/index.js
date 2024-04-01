import express from 'express';
import authRoutes from './authRoutes.js';
import toursRoutes from './tours.js'; // Import the tours router

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tours', toursRoutes); // Mount the tours router at /tours

export default router;
