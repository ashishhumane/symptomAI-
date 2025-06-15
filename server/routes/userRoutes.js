const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
const symptomModel = require('../models/symptom')
const reportsModel = require('../models/reports')
const medsModel = require('../models/medication')
const isLoggedin = require('../middlewares/isLoggedin')
const jwt = require('jsonwebtoken')
const { marked } = require('marked');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path')

const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

function generatePdf(html) {
  const fileName = `HealthReport_${Date.now()}.pdf`;
  const filePath = path.join(reportsDir, fileName);

  pdf.create(html).toFile(filePath, (err, res) => {
    if (err) {
      return console.error('PDF generation error:', err);
    }
    console.log('PDF saved to:', res.filename);
  });
}

router.get('/', (req, res) => {
  res.send('hey');
});

router.get('/profile', isLoggedin, async (req, res) => {
  const token = req.cookies.token; // 

  if (!token) {
    return res.redirect('/');
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findOne({ email: decoded.email }).select("-password");

  res.render('profile', { user });
});

router.get('/dashboard', async (req, res) => {
  const token = req.cookies.token; // 

  if (!token) {
    return res.redirect('/');
  }

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findOne({ email: decoded.email }).select("-password");
  const symptoms = await symptomModel.find()
  res.render('dashboard', { user, symptoms })
  // res.send(symptoms)
})

router.post('/dashboard', async (req, res) => {
  const { medName, time } = req.body;
  let meds = await medsModel.create({
    medName,
    time
  })

  console.log(meds);
  res.send(meds)

})

router.get('/reports', (req, res) => {
  res.render('reports')
})

router.get('/symptoms', isLoggedin, (req, res) => {
  res.render('symptoms')
})

router.post('/symptoms', async (req, res) => {
  const { symptomName, severity, duration } = req.body;
  let symptom = await symptomModel.create({
    symptomName,
    severity,
    duration
  })
  res.redirect('/user/symptoms')
})

router.get('/generatereports', (req, res) => {  
  
  
  async function getGeminiResponse(userInput) {

    
    const symptoms = await symptomModel.find()

    symptoms.forEach(element => {
      userInput += element.symptomName
    });

    userInput = `The patient is experiencing the following symptoms headache , cough.`
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB83-azAwbZj8lBhIhRYTwuX6fHjqyP5DU`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a professional medical assistant. Based on the symptoms and medical history provided, generate a detailed health report in a structured format. 
                  
                  The report should include:
                  1. Patient Summary (age, gender if given)
                  2. Symptom Analysis
                  3. Possible Conditions or Causes
                  4. Recommended Next Steps
                  5. Emergency Flags (if applicable)
                  6. Final Recommendation

                  Always add a disclaimer that this is AI-generated and not a substitute for professional medical advice.`
                },
                {
                  text: "Input: " + userInput 
                }
              ]
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const reply = data.candidates[0].content.parts[0].text;
        
        const markdownText = reply
        const html = marked(markdownText);
        // console.log("Gemini Response:", html);
        // res.send(html)
        generatePdf(html)
        res.redirect('/user/reports')
        // return html;
        
      } else {
        console.error("No candidates returned", data);
        return null;
      }
      
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return null;
    }
  }
  getGeminiResponse()
})

module.exports = router;