const User = require('../models/user');

const { body, validationResult } = require('express-validator');


// User sign up
exports.user_create_get = (req, res) => {
    res.render('sign-up-form');
}

exports.user_create_post = (req, res, next) => {
    console.log(req.body)
    const user = new User({
        ...req.body,
    }).save(err => {
        if (err) {
            // console.log({err})
            return next(err);
        };
        res.redirect('/');
    });


    // body('first-name', 'First name must be specified').trim().isLength({ min: 1}).escape(),
    // // body('last-name', 'Last name must be specified').trim().isLength({ min: 1}).escape(),
    // // body('email', 'Must be valid email').isEmail(),
    // // body('password').isLength({ min: 8 }),
    // // // body('confirmation-password').custom((value, { req }) => {
    // // //     if (value !== req.body.password) {
    // // //         throw new Error('Passwords must match');
    // // //     }
    // // //     return true;
    // // // }),

    // (req, res, next) => {
    //     // const errors = validationResult(req);

    //     if (!errors.isEmpty()) {
    //         res.render('sign-up-form', { errors, ...req.body, });
    //         return ;
    //     } 

    //     const hashedPassword = async (password) => await bcrypt.hash(password, 10, (err, hashedPassword) => {
    //         if (err) {
    //             throw new Error('Error hashing password');
    //         } else {
    //             return hashedPassword
    //         }
    //     });

    //     console.log(req.body);

    //     const user = new User({
    //         ...req.body,
    //         password: hashedPassword(),
    //     }).save((err) => {
    //         if (err) { return next(err); }
    //         res.redirect('/');
    //     });
    // }

}

