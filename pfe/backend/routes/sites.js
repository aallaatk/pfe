import express from 'express';
import Site from '../models/site.js';
import mongoose from "mongoose";
const router = express.Router();

// POST route to create a new site with images
router.post('/sites/create', async (req, res) => {
  try {
    const { sitename, sitedescription, sitelocation, siteimages } = req.body;

    // Create a new site instance
    const newSite = new Site({
      sitename,
      sitedescription,
      sitelocation,
      siteimages,
    });

    // Save the new site to the database
    await newSite.save();

    res.status(201).json(newSite);
  } catch (error) {
    console.error('Error creating site:', error);
    res.status(500).json({ message: 'Failed to create site' });
  }
});
// get all sites route
router.get('/sites', async (req, res) => {
  try {
    // Fetch all sites from the database
    const sites = await Site.find();

    res.status(200).json(sites);
  } catch (error) {
    console.error('Error fetching sites:', error);
    res.status(500).json({ message: 'Failed to fetch sites' });
  }
});
// GET a specific site by ID
// GET a specific site by ID
router.get('/sites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const site = await Site.findById(id);

    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    res.status(200).json(site);
  } catch (error) {
    console.error(`Error fetching site with ID ${id}:`, error);
    res.status(500).json({ message: 'Failed to fetch site' });
  }
});

/* delete a specific site by id */
router.delete('/sites/:id', async (req, res) => {
  const { id } = req.params;

  // Check if 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid site ID' });
  }

  try {
    const deletedSite = await Site.findByIdAndDelete(id);

    if (!deletedSite) {
      return res.status(404).json({ message: 'Site not found' });
    }

    res.status(200).json({ message: 'Site deleted successfully', deletedSite });
  } catch (error) {
    console.error('Error deleting site:', error);
    res.status(500).json({ message: 'Failed to delete site' });
  }
});

// PUT route to update a specific site by ID
router.put('/sites/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSiteData = req.body;

  // Check if 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid site ID' });
  }

  try {
    const existingSite = await Site.findById(id);

    if (!existingSite) {
      return res.status(404).json({ message: 'Site not found' });
    }

    // Update site fields based on the provided data
    Object.assign(existingSite, updatedSiteData);

    const updatedSite = await existingSite.save();

    res.status(200).json(updatedSite);
  } catch (error) {
    console.error('Error updating site:', error);
    res.status(500).json({ message: 'Failed to update site' });
  }
});

export default router;
