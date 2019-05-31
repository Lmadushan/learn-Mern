const express = require('express');
const router = express.Router();

//Item model
const Item  = require('../../models/Item');

// @router GET api/items
// @desc get all Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items));
});

// @router POST api/items
// @desc create a post
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @router DELETE api/items
// @desc Delete a post
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({sussess: true})))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;