const User = require("../models/User")
const MarketTransaction = require("../models/MarketTransaction")
const mongoose = require('mongoose')

// put item up for sale:
// 1. validate that the user is the owner of the item
// 2. remove it from his inventory
// 3. create a transaction

exports.sell = async (req, res) => {
    const item_id = req.body.item._id;
    const sellerUsername = req.body.seller.username;
  
    try {
      const item = await User.findOne({ username: sellerUsername, "items._id": item_id });
      if (!item)
        return res.status(404).send({ message: "Item not found." });
  
      const session = await mongoose.startSession();
      session.startTransaction();
  
      await User.findOneAndUpdate(
        { username: sellerUsername },
        { $pull: { items: { _id: item_id } } },
        { session }
      );
  
      const sellOffer = new MarketTransaction({
        postedDate: new Date(),
        ...req.body
      });
  
      await sellOffer.save();
  
      await session.commitTransaction();
      session.endSession();
  
      console.log('Sell offer saved');
      return res.status(200).send({ message: "Created sell offer" });
    } catch (error) {
      console.error('Failed to save document', error);
      return res.status(500).send({ message: "Failed to create sell offer" });
    }
  };
  


exports.active_offers = async (req, res) => {
    const offers = await MarketTransaction.find( { status: 'Active' } ).lean();
    res.send(offers);
}

exports.buy = async (req, res) => {
    const buyer = req.body.username;
    const transaction_id = req.body._id
    const transaction = await MarketTransaction.findOne( 
        { _id: transaction_id}
    )
    console.log(transaction)

    // const session = await mongoose.startSession();
    // session.withTransaction( async() => {
    //     const transaction = await MarketTransaction.findOne( 
    //         { username: req.body.username},
    //         { items: { _id: item_id}}
    //     );
    //     if (!item)
    //         return res.status(404).send({ message: "Item not found." });
    //     await User.findOneAndUpdate(
    //             { username: req.body.username },
    //             { $pull: { items: { _id: item_id } } });
    //     sellOffer = new MarketTransaction( {
    //         postedDate: new Date(),
    //         ...req.body
    //         });
    //     sellOffer.save()
    //     .then(() => console.log('Sell offer saved'))
    //     .catch((err) => console.error('Failed to save document', err));
    // });

    // session.endSession();
    return res.status(200).send( { message: "Created sell offer" })
}
