const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    type: String,
    // owner: {
    //     type: [mongoose.ObjectId],
    //     ref: 'User',
    // },
    imgUrl: String
});

module.exports = itemSchema
