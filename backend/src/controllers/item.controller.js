const marketTransactionModel = require("../models/marketTransaction")
exports.allAccess = async (req, res) => {
    const Items = await marketTransactionModel.find({}).lean();
    res.send(Items);
}

exports.post = (req, res) => {
    let item = new marketTransactionModel(req.body);
    // console.log(item)
    item.save()
        .then(() => console.log('Document saved'))
        .catch((err) => console.error('Failed to save document', err));
    // res.sendStatus(200);
}