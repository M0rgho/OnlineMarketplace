const mongoose = require('mongoose');

const itemOnSaleSchema = new mongoose.Schema({
    // item: {
    //     type: mongoose.ObjectId,
    //     ref: 'Item'
    // }
    name: String,
    date: { type: Date, default: Date.now },
    type: String,
    owner: {
        default: "648c954db7a17894a61341f9",
        type: mongoose.ObjectId,
        ref: 'User',
    },
    imgUrl: String,
    price: Number,

    // new
    fromCollection: String,
    rarity: {
        type: String,
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
        immutable: true
    },
    condition: {
        type: String,
        enum: ['battle-scarred', 'well-worn','field-tested','minimal-wear','factory-new'],
        immutable: true
    }
});
const itemOnSaleModel = mongoose.model('Items', itemOnSaleSchema)

module.exports = itemOnSaleModel
