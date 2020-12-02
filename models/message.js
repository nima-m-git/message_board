const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        text: {
            type: String,
            required: true,
            maxlength: 5000,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }
);

// Virtual for message's URL
MessageSchema
.virtual('url')
.get(() => '/messages/' + this._id);