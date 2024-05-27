// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import the CORS middleware
import authRoutes from './routes/authRoutes.js'; // Import your authRoutes
import tourRoutes from './routes/tours.js';
import siteRoutes from './routes/sites.js';
import statsRouter from './routes/Stats.js'; // Import your tourRoutes
import stripe from './routes/StripePayment.js';
import upload from './multerConfig.js';
const PORT = 3000;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
const server = express();

// Middleware setup
server.use(express.json());
server.use(cors()); // Enable CORS for all routes
server.use(upload.single('image'));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pfe')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Mount auth routes
server.use('', authRoutes);

// Mount tour routes
server.use('', tourRoutes);
server.use('', statsRouter);
server.use('', siteRoutes)
server.use('', stripe)
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
