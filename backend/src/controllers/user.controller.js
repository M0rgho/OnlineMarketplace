const userModel = require("../models/User")
const jwt = require("jsonwebtoken");


exports.userAccess = async (req, res) => {
    const getItems = req.query.items;
    let isAccountOwner = false;
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token || token === '') {
        return res.status(403).send({ message: "No token provided!" });
    } else {
        // decoded_token: { id: ..., username: ...}
        const decoded_token = await jwt.verify(token, "Secret");
        isAccountOwner = decoded_token.username === req.params.username;
    }
    

    try {
        let userData;
        
        let projection = {};
        if (!isAccountOwner)
            projection = 'username role items'
        
        
        if (getItems == '1') {
            userData = await userModel.findOne({ username: req.params.username })
            .populate('items')
            .select(projection)
            .lean()
        } else {
            userData = await userModel.findOne({ username: req.params.username })
            .select(projection)
            .lean()
        }
        
        res.send(userData);
    } catch(error) {
        console.log(error);
        res.status(500).json("Internal server error: " + error);
    }
    
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