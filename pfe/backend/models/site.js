import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
  sitename: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  images: [{ type: String }], // Array of image URLs
  reviews: [
    {
      username: { type: String },
      comment: { type: String },
      rating: { type: Number, min: 0, max: 5 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Site = mongoose.model('Site', siteSchema);

export default Site;
