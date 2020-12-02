const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');



// User sign up
exports.user_create_get = (req, res) => {
    res.render('sign-up-form');
}

exports.user_create_post = [
    body('firstName', 'First name must be specified').trim().isLength({ min: 1}).escape(),
    body('lastName', 'Last name must be specified').trim().isLength({ min: 1}).escape(),
    body('email', 'Must be valid email').isEmail()
        .custom(async (value, { req }) => {
            const emails = (await User.find({}, 'email')).map(obj => obj.email);
            if (emails.includes(value)) {
                throw new Error('Email already registered');
            }
            return true;
        }),
    body('username', 'Username must be specified').trim().isLength({ min: 1}).escape()
        .custom(async (value, { req }) => {
            const usernames = (await User.find({}, 'username')).map(obj => obj.username);
            if (usernames.includes(value)) {
                throw new Error('Username already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('confirm-password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render('sign-up-form', { ...errors, ...req.body, });
            return ;
        } 

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            } 
            const user = new User({
                ...req.body,
                password: hashedPassword,
                membership: 'basic',
            }).save((err) => {
                if (err) { return next(err); }
                res.redirect('/');
            });
        });

    }
]

