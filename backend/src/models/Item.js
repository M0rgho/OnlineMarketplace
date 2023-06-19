const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    type: {
        type: String,
        enum: ['weapon', 'gloves'],
        immutable: true
    },
    imgUrl: String,
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

const itemModel = mongoose.model('Item', itemSchema);

module.exports = {itemSchema, itemModel};
