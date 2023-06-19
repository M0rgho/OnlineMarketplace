const User = require("../models/User")
const MarketTransaction = require("../models/MarketTransaction")


// put item up for sale:
// 1. validate that the user is the owner of the item
// 2. remove it from his inventory
// 3. create a transaction

exports.sell = async (req, res) => {
    const item_id = req.body.item._id;
    const item = await User.findOne( 
        { username: req.body.username},
        { items: { _id: item_id}}
    );
    console.log(item);
    const session = await mongoose.startSession();
    session.withTransaction( async() => {
        const item = await User.findOne( 
            { username: req.body.username},
            { items: { _id: item_id}}
        );
        if (!item)
            return res.status(404).send({ message: "Item not found." });
        await User.findOneAndUpdate(
            { username: req.body.username },
            { $pull: { items: { _id: item_id } } });
            sellOffer = new MarketTransaction( {
                postedDate: new Date(),
                ...req.body
            });
        sellOffer.save()
        .then(() => console.log('Sell offer saved'))
        .catch((err) => console.error('Failed to save document', err));
    });
    return res.status(200).send( { message: "Created sell offer" })
}

exports.active_offers = async (req, res) => {
    const offers = MarketTransaction.find( { status: 'Active' } ).lean();
    res.send(offers);
}