const mongoose = require('mongoose')

const medsSchema = mongoose.Schema({
    medName: String,
    time: String
})

const meds = mongoose.model('meds', medsSchema);

module.exports = meds;