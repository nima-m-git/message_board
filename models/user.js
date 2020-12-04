const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// const validateEmail = (email) => re.test(email);

const UserSchema = new Schema(
    {
        username: { 
            type: String, 
            required: [true, 'Username required'],
            maxlength: 30,
            trim: true, 
        },
        email: { 
            type: String, 
        },
        password: {
            type: String,
            minlength: 5,
            required: true,
        },
        membership: String,
        firstName: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        }
    }
)

// Virtual for user url
UserSchema
.virtual('url')
.get(() => '/user/' + this._id);

// Virtual for user fullname
UserSchema
.virtual('fullname')
.get(() => this.firstName + ' ' + this.lastName);


module.exports = mongoose.model('User', UserSchema);
