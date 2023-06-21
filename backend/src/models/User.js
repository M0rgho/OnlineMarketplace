const mongoose = require('mongoose');
const itemSchema = require('./Item').itemSchema;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        minLength: [5, "Your username is to short"]
        },
    password: String, // todo constraints(length etc.)
    firstname: String,
    lastname: String,
    email: {
        type: String, 
        required: 'Email address is required',
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN'],
        immutable: true
    },
    registrationDate: {
        type: Date, 
        default: Date.now,
        immutable: true
    },
    lastLoginDate: {type: Date},
    balance: {
        type: Number,
        default: 0,
        min: 0,
    },
    items: {
        type: [mongoose.ObjectId],
        ref: 'Item'
    },
    transactions: {
        type: [mongoose.ObjectId],
        ref: 'MarketTransaction',
    },
    preferences: {
        dark_mode: { type: Boolean, default: false },
        private_invenotry: { type: Boolean, default: true }
    }
});
const userModel = mongoose.model('User', userSchema);

module.exports = userModel
