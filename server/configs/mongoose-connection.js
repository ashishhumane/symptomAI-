const mongoose = require('mongoose')
require('dotenv')
// const config = require('config')
mongoose
.connect(`mongodb+srv://hashish23it:6P4JTBMXvVKHqSci@cluster0.h8balih.mongodb.net/sympAI`)
.then(() => {
    console.log('connected');
})
.catch((err) => {
    console.log(err.message);
})

module.exports = mongoose.connection;