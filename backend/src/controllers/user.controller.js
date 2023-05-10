const userModel = require("../models/User")

exports.userAccess = async (req, res) => {
    const userData = await userModel.findOne({ username: req.params.username }).lean();
    res.send(userData);
}