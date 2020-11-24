const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        email: String,
        password: String,
        language: String,
        country: String,
        userType: {
            type: String,
            enum: ['user', 'ngo_admin', 'super_admin'],
            default: 'user',
        },
        // method: {
        //     type: String,
        //     enum: ['local', 'google', 'facebook'],
        //     default: 'user',
        //     required: true,
        // },
        // google: {
        //     id: {
        //         type: String
        //     }
        // },
        // organizations: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'organization'
        //     },
        // ],
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        versionKey: false,
    }
);

const User = mongoose.model('user', UserSchema, 'user');

module.exports = User;