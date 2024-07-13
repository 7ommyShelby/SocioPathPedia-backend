const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        picturePath: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        location: {
            type: String,
        },

        occupation: String,
        viewedProfile: String,
        impressions: Number
    },
    {
        timestamps: true
    }
);

const usermodel = mongoose.model('User', userSchema);
module.exports = usermodel;

