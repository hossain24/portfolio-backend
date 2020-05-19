const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateLoginInput = require("../auth/signin");
const validateRegisterInput = require("../auth/signup");

// Load User model
const Member = require("../models/member-model");

// @route POST members/login
// @desc Login member and return JWT token
// @access Public
router.post("/signin", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find member by email
    Member.findOne({ email }).then(member => {
        // Check if member exists
        if (!member) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, member.password).then(isMatch => {
            if (isMatch) {
                // Member matched
                // Create JWT Payload
                const payload = {
                    id: member.id,
                    name: member.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// @route POST members/register
// @desc Register member
// @access Public
router.route('/signup').post((req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Member.findOne({ email: req.body.email }).then(member => {
        if (member) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newMember = new Member({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newMember.password, salt, (err, hash) => {
                    if (err) throw err;
                    newMember.password = hash;
                    newMember
                        .save()
                        .then(member => res.json(member))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;