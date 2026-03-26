const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { authMiddleware } = require('../middleware/auth');


// Book appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { service, date, time, message } = req.body;
    const appointment = await Appointment.create({
      patient: req.user.id,
      patientName: req.user.name,
      patientEmail: req.body.email || '',
      service, date, time, message
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get my appointments
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const appt = await Appointment.findOne({ _id: req.params.id, patient: req.user.id });
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    appt.status = 'cancelled';
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
