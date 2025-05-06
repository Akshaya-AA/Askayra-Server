const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Middleware to verify admin password from req.body
const verifyAdminPassword = (req, res, next) => {
  const { password } = req.body;
  const adminPassword = 'askayra830';

  if (password === adminPassword) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid password' });
  }
};

// ✅ Create Booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get All Bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update Booking
router.put('/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete Booking with password check
router.delete('/:id', verifyAdminPassword, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
