const userModel = require("../models/User")

exports.userAccess = async (req, res) => {
    const userData = await userModel.findOne({ username: req.params.username }).lean();
    res.send(userData);
}
exports.addMoney = async (req, res) => {
    const userData = await userModel.updateOne({ username: req.params.username }, req.body)        
    .then(() => {
        console.log('Balance saved')
        res.status(200).json("Ok")
    })
    .catch((err) => {
        console.error('Failed to save balance', err)
        res.status(500).json("Error")
    });
// res.sendStatus(200);;
    // const userData = await userModel.findOneAndUpdate({ username: req.params.username }, req.body, {upsert: true});

}