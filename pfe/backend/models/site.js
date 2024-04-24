import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
  sitename: { type: String, required: true },
  sitedescription: { type: String },
  sitelocation: { type: String },
  siteimages: [{ type: String }], // Array of image URLs
 
});

const Site = mongoose.model('Site', siteSchema);

export default Site;
