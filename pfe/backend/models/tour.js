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
  imageUrl: { type: String },
 
  reservedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now } , // Array of user IDs // Add imageUrl field
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;