const User = require('../models/user');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');


// Display all messages, exclusive members see authors and timestamps
exports.index = (req, res, next) => {
    Message.find({}, 'title timestamp author')
        .populate('author')
        .sort('-timestamp')
        .exec((err, messages) => {
            if (err) { return next(err); }
            res.render('message_list', { messages, membership: MEMBERSHIP });
        });
};

// Display details for specific message
exports.message_detail = (req, res, next) => {
    Message.findById(req.params.id).exec((err, message) => {
        if (err) { return next(err); }
        if (!message) {
            const err = new Error('message not found');
            err.status = 404;
            return next(err);
        }
        res.render('message_detail', { message, membership: MEMBERSHIP, });
    });
}

// // Display message create form
// exports.message_create_get = (req, res, next) => {
//     // if user is logged in
//     if () {
//         res.render('message_form', { title: 'New Message' });
//     } else {
//         // not logged in, redirect to login with message
//         res.redirect(LOGIN, { error: 'must be logged in to create message' });
//     }
// }

exports.message_create_post = (req, res, next) => {
    
}