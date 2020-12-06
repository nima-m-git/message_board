const User = require('../models/user');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');

// Details for specific message
exports.message_detail = (req, res, next) => {
    Message.findById(req.params.id)
        .populate('author')
        .exec((err, message) => {
            if (err) { return next(err); }
            if (!message) {
                const err = new Error('message not found');
                err.status = 404;
                return next(err);
            }
            res.render('message_detail', { message, });
    });
}

// Message index, list of all messages
// TODO - break list into pages
exports.message_index = (req, res, next) => {
    Message.find({})
        .populate('author')
        .sort('-timestamp')
        .exec((err, message_list) => {
            if (err) { return next(err); }
            res.render('message_list', { message_list, })
    });
}

// Message create form
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
];


// Delete message, moderator only
exports.message_delete_post = (req, res, next) => {
    if (req.user.membership !== 'moderator') {
        Message.findById(req.params.id, (err) => {
            if (err) { return next(err); }
            if (!message) {
                const err = new Error('message not found');
                err.status = 404;
                return next(err);
            }
            res.redirect(message.url);
        });
    }
    Message.findByIdAndRemove(req.params.id, (err) => {
        if (err) { return next(err); }
        res.redirect('/messages');
    });
}