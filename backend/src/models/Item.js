const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: string,
    date: {  type: Date,
         default: Date.now },
    imgUrl: string,
    fromCollection: string,
    rarity: {
        type: string,
        enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
        immutable: true
    },
    condition: {
        type: string,
        enum: ['battle-scarred', 'well-worn','field-tested','minimal-wear','factory-new'],
        immutable: true
    }
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
