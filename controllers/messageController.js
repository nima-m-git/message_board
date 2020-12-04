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
            res.render('message_list', { messages });
        });
};

// Display details for specific message
exports.message_detail = (req, res, next) => {
    Message.findById(req.params.id).populate('author').exec((err, message) => {
        if (err) { return next(err); }
        if (!message) {
            const err = new Error('message not found');
            err.status = 404;
            return next(err);
        }
        res.render('message_detail', { ...message._doc, });
    });
}

// Display message create form
exports.message_create_get = (req, res, next) => {
    // if user is logged in
    if (req.user) {
        res.render('message_form', { title: 'New Message' });
    } else {
        // not logged in, redirect to login with message
        res.render('login', { error: 'must be logged in to create message' });
    }
}

exports.message_create_post = [
    body('title').trim().isLength({ min: 1 }).escape(),
    body('content').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('message_form', { ...req.body, ...errors, });
            return;
        }

        const message = new Message({
            ...req.body,
            author: req.user,
        });
        message.save((err) => {
            if (err) { return next(err); }
            res.redirect(message.url);
        });
    }
]
