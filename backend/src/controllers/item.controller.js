const itemOnSaleModel = require("../models/ItemOnSale")
exports.allAccess = async (req, res) => {
    const Items = await itemOnSaleModel.find({}).lean();
    res.send(Items);
}

exports.post = (req, res) => {
    let item = new itemOnSaleModel(req.body);
    // console.log(item)
    item.save()
        .then(() => console.log('Document saved'))
        .catch((err) => console.error('Failed to save document', err));
    // res.sendStatus(200);
}