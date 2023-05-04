const mongoose = require('mongoose');
const user = require('./User')


const transactionSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        immutable: true,
        min: 0
    },
    seller: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
    },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true,
        immutable: true,
    },
    date: {
        type: date,
        default: Date.now,
        immutable: true,
    }
});

module.exports = transactionSchema
