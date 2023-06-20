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
  
    const session = await mongoose.startSession();
    try {
      const item = await User.findOne({ username: sellerUsername, "items._id": item_id });
      if (!item)
        return res.status(404).send({ message: "Item not found." });
  
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
      await session.abortTransaction();
      console.error('Failed to save document', error);
      return res.status(500).send({ message: "Failed to create sell offer" });
    }
  };
  


exports.active_offers = async (req, res) => {
    const offers = await MarketTransaction.find( { status: 'Active' } ).lean();
    res.send(offers);
}

exports.buy = async (req, res) => {
  const transaction = req.body.transaction;
  console.log(req.body)
  const session = await mongoose.startSession()
  try {
    session.startTransaction();

    const transaction = await MarketTransaction.findOne({ _id: req.body.transaction._id});
    const buyer = await User.findOne({ username: req.body.username});
    const seller = await User.findOne({_id: transaction.seller});

    if(buyer.balance < transaction.price){
      return res.status(404).send({ message: "Buyer cannot afford item." });
    }
    if(buyer._id.equals(transaction.seller)){
      return res.status(404).send({ message: "Buyer cannot buy own item." });
    }

    transaction.status = 'Successful';
    transaction.sellDate = Date.now();
    transaction.buyer = buyer._id;
    buyer.items.push(transaction.item)
    buyer.balance -= transaction.price
    seller.balance+=transaction.price
    await transaction.save()
    await seller.save()
    await buyer.save()

    await session.commitTransaction();
    session.endSession();

  } catch (error) {
    await session.abortTransaction();
    console.error('Failed to buy', error);
    return res.status(500).send({ message: "Failed to buy" });
  }
}

exports.cancel = async (req, res) => {
  
  const session = await mongoose.startSession()
  try {
    session.startTransaction();

    const transaction = await MarketTransaction.findOne({ _id: req.body._id});
    const seller = await User.findOne({_id: transaction.seller});

    transaction.status = 'cancelled';
    transaction.sellDate = Date.now();

    seller.items.push(transaction.item)

    await transaction.save()
    await seller.save()

    await session.commitTransaction();
    session.endSession();

  } catch (error) {
    await session.abortTransaction();
    console.error('Failed to cancel', error);
    return res.status(500).send({ message: "Failed to cancel" });
  }
}