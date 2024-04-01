import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tours.js';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Mount auth routes
app.use('/api/auth', authRoutes);

// Mount tour routes
app.use('/api/tours', tourRoutes);

export default app;
