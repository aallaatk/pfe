import { Schema, model } from 'mongoose';

const tourSchema = new Schema({
  image: String,
  tourname: String,
  creator: String,
  date: Date,
  price: Number,
  description: String,
  attendees: Number,
  location: String,
  duration: String,
});

const Tour = model('Tour', tourSchema);

export default Tour;
