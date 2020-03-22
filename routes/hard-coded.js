const router = require('express').Router();

router.route('/').get((req, res) => {
    const users = [
        { id: 1, firstName: "John", lastName: "Snow" },
        { id: 2, firstName: "Jason", lastName: "Hopkin" },
        { id: 3, firstName: "Jonson", lastName: "Kim" },
        { id: 4, firstName: "Josef", lastName: "Milford" },
        { id: 5, firstName: "Jacob", lastName: "Nilsen" }
    ];

    res.json(users);
})

module.exports = router;