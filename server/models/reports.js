const mongoose = require('mongoose')

const reportsSchema = mongoose.Schema({
    report: String
})

const report = mongoose.model('report', reportsSchema);

module.exports = report;