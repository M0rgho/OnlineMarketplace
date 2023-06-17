const mongoose = require('mongoose');
const ItemModel = require("./Item");

const marketTransaction = new mongoose.Schema({
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
    },
    sellDate: { type: Date },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
});

const marketTransactionModel = ItemModel.discriminator('MarketTransaction', marketTransaction); 

module.exports = marketTransactionModel
