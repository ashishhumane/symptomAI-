const mongoose = require('mongoose')

const symptomSchema = mongoose.Schema({
    symptomName: String,
    severity: String,
    duration:String,
})

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;