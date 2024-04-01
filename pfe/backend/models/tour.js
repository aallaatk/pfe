import { Schema, model } from 'mongoose';

const tourSchema = new Schema({
  image: { type: String, required: true },
  tourname: { type: String, required: true },
  creator: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  attendees: { type: Number, required: true },
  loaction: { type: String, required: true },
  duration: { type: String, required: true },
});

const Tour = model('Tour', tourSchema);

export default Tour;
