const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

module.exports = async function (req, res, next) {
    try {
        const token = req.cookies.token; // ✅ fixed spelling

        if (!token) {
            return res.redirect('/auth/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.redirect('/');
        }

        req.user = user; // attach user to request
        next(); // ✅ go to next middleware or route
    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.redirect('/auth/login');
    }
};
