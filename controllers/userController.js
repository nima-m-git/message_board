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
    body('email', 'Must be valid email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('confirm-password').custom((value, { req }) => {
        console.log({ value, ...req.body, })
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

