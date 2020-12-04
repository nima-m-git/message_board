const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        content: {
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
.get(function () {
    return '/messages/' + this._id;
}); 

module.exports = mongoose.model('Message', MessageSchema);