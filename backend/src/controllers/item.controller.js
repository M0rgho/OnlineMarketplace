const { mongoose } = require("mongoose");

const Item = require("../models/Item").itemModel;


exports.allAccess = async (req, res) => {
    if (req.query.hasOwnProperty('id')) {
        const item = await Item.findById(req.query.id).lean();
        if(item)
            res.send(item);
        else   
            res.sendStatus(404);
        return;
    }
    const Items = await Item.find().lean();
    res.send(Items);
}

exports.post = (req, res) => {
    let itemToSave = new Item(req.body);
    // console.log(item)
    itemToSave.save()
        .then(() => console.log('Document saved'))
        .catch((err) => console.error('Failed to save document', err));
    // res.sendStatus(200);
}