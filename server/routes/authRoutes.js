const express = require('express');
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { registerUser,loginUser } = require('../controller/authController')

router.get('/', (req, res) => {
    res.send('Auth route working properly');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.redirect('/auth/login');
});


module.exports = router
