const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User model
const User = require('../../models/User.js');

// @route   POST api/auth
// @desc    Login a user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please enter a value for all fields" })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ success: false, message: "Either the username or password is not recognized" });
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ success: false, message: "Either the username or password is not recognized" });
                    jwt
                        .sign(
                            { _id: user._id, name: user.name, email: user.email },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;

                                res.json({
                                    token,
                                    user: {
                                        _id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        );
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

});

// @route   POST api/auth/user
// @desc    Get User data
// @access  Protected
router.get('/user', auth, (req, res) => {
    User
        .findById(req.user._id)
        .select('-password')    // disregard the password
        .then(user => res.json(user))
        .catch(err => console.log(err));
})

module.exports = router;
