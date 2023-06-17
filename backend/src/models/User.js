const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true,
        unique: true,
        immutable: true,
        minLength: [5, "Your username is to short"]
        },
    password: string, // todo constraints(length etc.)
    firstname: string,
    lastname: string,
    email: {
        type: string, 
        required: 'Email address is required',
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
        type: string,
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
        type: number,
        default: 0,
        min: 0,
    },
    items: [],
    transactions: {
        type: [mongoose.ObjectId],
        ref: 'MarketTransaction',
    },
});
const userModel = mongoose.model('User', userSchema);

module.exports = userModel
