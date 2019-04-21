const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User.js');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please enter a value for all fields" })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ success: false, message: "A User with ths email already exists!" });
            // const salt = bcrypt.genSalt(10);
            // const hash = bcrypt.hashSync(password, salt)
            const newUser = new User({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            });
            newUser
                .save()
                .then(user => {
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
