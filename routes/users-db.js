const router = require('express').Router();
const User = require('../models/user-data');

router.route('/').get((req, res) => {
    User.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;