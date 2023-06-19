const mongoose = require('mongoose');
const itemSchema = require('./Item').itemSchema;



const marketTransactionSchema = new mongoose.Schema({
    item: {
        type: mongoose.ObjectId,
        ref: 'Item'
    },
    postedDate: { type: Date, default: Date.now },
    price: { type: Number, required: true},
    status: { 
        type: String,
        enum: ['Active', 'Cancelled', 'Successful'],
        default: 'Active',
        index: true
    },
    seller: {
        default: "648c954db7a17894a61341f9",
        type: mongoose.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    sellDate: { type: Date },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User',
        index: true
    }
});

const marketTransactionModel = mongoose.model('MarketTransaction', marketTransactionSchema); 

module.exports = marketTransactionModel
