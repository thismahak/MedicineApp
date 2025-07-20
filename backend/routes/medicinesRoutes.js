const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Get all medicines
router.get('/', async (req, res) => {
  const meds = await Medicine.find();
  res.json(meds);
});

// Add medicine
router.post('/', async (req, res) => {
  const med = new Medicine(req.body);
  await med.save();
  res.status(201).json(med);
});

// Update medicine
router.put('/:id', async (req, res) => {
  const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(med);
});

// Delete medicine
router.delete('/:id', async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
