const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item model
const Item = require('../../models/Item.js');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   GET api/items/:_id
// @desc    Get specified item
// @access  Public
router.get('/:_id', (req, res) => {
    Item.findById(req.params._id)
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create an item
// @access  Protected
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:_id
// @desc    Delete an item
// @access  Protected
router.delete('/:_id', auth, (req, res) => {
    Item.findById(req.params._id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
