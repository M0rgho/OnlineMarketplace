const item = require("../models/Item").itemModel
const User = require("../models/User")
exports.allAccess = async (req, res) => {
    const Items = await item.find({}).lean();
    res.send(Items);
}

exports.createItem = async (req, res) => {
    // console.log(req.body)
    const itemToSave = new item(req.body)
    // itemToSave.save()
    // console.log(itemToSave.name)
    await User.findOneAndUpdate(
        { username: "admin" },
        { $push: { items: itemToSave } });
     
 
     
    // res.sendStatus(200);
}