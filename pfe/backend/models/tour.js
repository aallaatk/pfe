import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  tourname: { type: String },
  creator: { type: String },
  date: { type: Date },
  price: { type: Number },
  description: { type: String },
  attendees: { type: Number },
  location: { type: String },
  duration: { type: String },
  imageUrl: { type: String }, // Add imageUrl field
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
