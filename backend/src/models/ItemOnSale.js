const mongoose = require('mongoose');

const itemOnSaleSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    type: String,
    owner: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    imgUrl: String,
    price: Number
});
const itemOnSaleModel = mongoose.model('Items', itemOnSaleSchema)

module.exports = itemOnSaleModel
