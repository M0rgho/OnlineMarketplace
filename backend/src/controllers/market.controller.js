const User = require("../models/User");
const Item = require("../models/Item").itemModel;
const MarketTransaction = require("../models/MarketTransaction");
const mongoose = require('mongoose');

// body: {
//   transaction: {    
//     seller_name: user.username,
//     item_id: item._id,
//     price: item.price
//   }
// }

async function ownsItem(user_id, item_id, session) {
    const user = await User.findOne({
        _id: user_id,
        items: item_id
    }).session(session);
    console.log(user);
    return !!user;
}

exports.sell = async (req, res) => {
    console.log("SELL");
    const session = await mongoose.startSession();
    
    console.log(req.body);
    try {
        await session.withTransaction( async ()=> {
            const item_id = req.body.transaction.item_id;
            
            const item = await Item.findById(item_id).session(session);
            if (!item)
            return res.status(404).send({ message: "Item not found." });
            console.log(req.body.user.user_id, item_id);
            if(! await ownsItem(req.body.user.user_id, item_id, session))
                return res.status(403).send({ message: "You are not the owner of the item" });
            const sellTransaction = new MarketTransaction({
                price: req.body.transaction.price,
                seller: req.body.user.user_id,
                item: item,
            });
            
            const savedTransaction = await sellTransaction.save({ session });
            
            
            await User.findByIdAndUpdate(
                req.body.user.user_id, {
                    $pull: { items: item_id },
                    $push: { transactions: savedTransaction._id }
                }).session(session);
                
                return res.status(201).send({ message: "Successfully created sell transaction" });
        });
        } 
    catch (error) {
        console.error('Failed to create sell transaction', error);
        return res.status(500).send({ message: "Failed to create sell offer:" + error });
    } 
    session.endSession();
};
    
    
    
exports.transactions = async (req, res) => {
    const allowedStatus = ['Active', 'Cancelled', 'Successful'];
    const status = req.query.status;
    const seller = req.query.seller;
    const buyer = req.query.buyer;
    const item = req.query.item_id;
    
    const filter = { };
    
    if (status !== undefined) {
        if (!allowedStatus.includes(status))
        return res.status(400).json({ error: 'Invalid status parameter.' });
        filter.status = status;
    }
    if (seller !== undefined && buyer !== undefined) {
        filter['$or'] = [
            { seller: seller },
            { buyer: buyer }
          ];
    }
    else if (seller !== undefined) {
        filter.seller = seller;
    }
    else if (buyer !== undefined) {
        filter.buyer = buyer;
    }
    
    if (item !== undefined) {
        filter['item._id'] = item;
    }
    console.log("filter", filter);
    const transactions = await MarketTransaction.find(filter).limit(1000).lean();
    return res.json(transactions);
}
    
// body: {
//   buyer_name: username,
//   transaction_id: transaction._id,
// }
exports.buy = async (req, res) => {
    console.log("BUY");
    
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction( async ()=>{

            const transaction = await MarketTransaction.findOne({ _id: req.body.transaction_id });
            if (!transaction) {
                return res.status(404).send({ message: 'Transaction not found' });
            }
            
            const [buyer, seller] = await Promise.all([
                User.findOne({ username: req.body.buyer_name }).session(session),
                User.findOne({ _id: transaction.seller }).session(session)
            ]);
            
            if (transaction.status !== 'Active') {
                return res.status(404).send({ message: 'Transaction not active' });
            }
            if (!buyer) {
                return res.status(404).send({ message: 'Invalid buyer' });
            }
            if (!seller) {
                return res.status(404).send({ message: 'Invalid seller' });
            }
            if (buyer.balance < transaction.price) {
                return res.status(404).send({ message: "Buyer cannot afford item." });
            }
            if (buyer._id.equals(transaction.seller)) {
                return res.status(404).send({ message: "Buyer cannot buy their own item." });
            }
            
            transaction.status = 'Successful';
            transaction.sellDate = Date.now();
            transaction.buyer = buyer._id;
            
            buyer.items.push(transaction.item._id);
            buyer.transactions.push(transaction._id);
            
            buyer.balance -= transaction.price;
            seller.balance += transaction.price;
            
            await Promise.all([
                buyer.save({ session }),
                seller.save({ session }),
                transaction.save({ session })
            ]);
            return res.status(200).json({ message: "Item bought sucessfully" });
        });
        
    } catch (error) {
        console.error('Failed to buy', error);
        return res.status(500).json({ message: "Failed to buy: " + error });
    } 
    session.endSession()
};

// body: {
//   transaction_id: transaction._id
//   seller: transaction.seller
// }
exports.cancel = async (req, res) => {
    console.log("CANCEL");
    
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction(async () => {
            const [transaction, seller] = await Promise.all([
                MarketTransaction.findById(req.body.transaction_id),
                User.findById(req.body.user.user_id)
            ]);
            
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            if (transaction.status !== 'Active') {
                return res.status(404).json({ message: 'Transaction not active' });
            }
            
            if(req.body.user.user_id.toString() !== transaction.seller.toString())
                return res.status(403).send({ message: "You are not the owner of the item" });
            
            transaction.status = 'Cancelled';
            transaction.sellDate = Date.now();
            seller.items.push(transaction.item._id);
            
            // console.log("transaction", transaction);
            // console.log("seller", seller);
            
            await Promise.all([ 
                transaction.save({ session }),
                seller.save({ session })
            ]);
            
            return res.status(200).json({ message: "Item sell offer cancelled sucessfully" });
            
        });
    } catch (error) {
        console.error('Failed to cancel', error);
        return res.status(500).send({ message: "Failed to cancel: " + error });
    } 

    session.endSession()
};
