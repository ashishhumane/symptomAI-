const express = require('express')
const path = require('path')
const db = require('./configs/mongoose-connection')
const cookieParser = require('cookie-parser');
const authRoutes  = require('./routes/authRoutes')
const indexRoutes  = require('./routes/indexRoutes')
const multer = require('multer');
const userRoutes  = require('./routes/userRoutes')
require('dotenv').config()

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'reports')));


app.use('/', indexRoutes)

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log(`app listening on port 3000`)
})