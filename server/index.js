const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../client')));



app.get('/', (req, res) => {
  res.render('index')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.get('/about', (req, res) => {
  res.render('aboutus')
})

app.get('/contact', (req, res) => {
  res.render('contactus')
})

app.get('/logSymptom', (req, res) => {
  res.render('symptomlog')
})

app.get('/features', (req, res) => {
  res.render('features')
})

app.listen(3000, () => {
  console.log(`app listening on port 3000`)
})