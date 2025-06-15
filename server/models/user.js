const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password:String,
    dob: Date,
    gender: String,
    medicalHistory: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;