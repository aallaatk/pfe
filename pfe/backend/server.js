import express from 'express';
import mongoose from 'mongoose';

const PORT = 3000;

const server = express();



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pfe')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
