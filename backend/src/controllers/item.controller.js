const item = require("../models/Item")
exports.allAccess = async (req, res) => {
    const Items = await item.find({}).lean();
    res.send(Items);
}

exports.post = (req, res) => {
    let itemToSave = new item(req.body);
    // console.log(item)
    itemToSave.save()
        .then(() => console.log('Document saved'))
        .catch((err) => console.error('Failed to save document', err));
    // res.sendStatus(200);
}