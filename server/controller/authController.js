const express = require('express');
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const jwt = require('jsonwebtoken')

module.exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, dob, gender, medicalHistory } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      dob,
      gender,
      medicalHistory,
    });

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });

    return res.redirect('/user/profile');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Something went wrong');
  }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(400).send('User not found');

        // Compare password
        const isMatch = bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user)
                res.cookie("token", token)
                res.redirect('/user/profile')
            } else {
                res.status(404).send('Invalid credentials')
            }
        })
    } catch (err) {
        res.status(500).send('Server error');
    };
}


