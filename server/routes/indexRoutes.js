const express = require('express');
const router = express.Router();
const doctModel = require('../models/doctor')

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('aboutus');
});

router.get('/contact', (req, res) => {
  res.render('contactus');
});
router.get('/features', (req, res) => {
  res.render('features');
});

router.get('/findDoctor', (req, res) => {
  res.render('finddoctor',{ doctors: [] });
});

router.post('/find', async (req, res) => {
  try {
    const { location, symptoms, specialty } = req.body;
    
    console.log(location, symptoms);
    
    // Find doctors where symptoms array includes the symptom string
    const doctors = await doctModel.find({
      location: { $regex: location, $options: 'i' },
      // specialty: { $regex: specialty, $options: 'i' },
      symptoms: { $in: [new RegExp(symptoms, 'i')] }
    });
    console.log(doctors);
    
    // Render the finddoctor.ejs view with doctor data
    res.render('finddoctor', { doctors });
  } catch (err) {
    console.error('Error finding doctor:', err);
    res.status(500).send('Server error');
  }
});

router.get('/getprescibe', (req, res) => {
  res.render('prescription');
});

router.get('/chatbot', (req, res) => {
  res.render('chatbot');
});
module.exports = router;