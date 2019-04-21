const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User.js');

// @route   POST api/users
// @desc    Register a user
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
            console.log(user);
            console.log(password);
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

module.exports = router;
