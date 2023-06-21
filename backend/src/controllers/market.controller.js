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

async function ownsItem(user_id, item_id) {
    const user = await User.findOne({
        _id: user_id,
        items: { $elemMatch: { _id: item_id } }
    });
    return !!user;
}

exports.sell = async (req, res) => {
    console.log("SELL");
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const item_id = req.body.transaction.item_id;
        const seller_username = req.body.transaction.seller_name;
        
        
        const item = await Item.findById(item_id).session(session);
        if (!item)
        return res.status(404).send({ message: "Item not found." });
                
        if(!ownsItem(req.body.user.user_id, item_id))
            return res.status(403).send({ message: "You are not the owner of the item" });
        const sellTransaction = new MarketTransaction({
            price: req.body.transaction.price,
            seller: req.body.user.user_id,
            item: item,
        });
        
        const savedTransaction = await sellTransaction.save({ session });
        
        
        await User.findByIdAndUpdate(
            req.body.user.user_id,
            { $pull: { items: item_id } },
            { $push: { transaction: savedTransaction._id }}
            ).session(session);
            
            
            await session.commitTransaction();
            
            return res.status(201).send({ message: "Successfully created sell transaction" });
        } catch (error) {
            await session.abortTransaction();
            console.error('Failed to create sell transaction', error);
            return res.status(500).send({ message: "Failed to create sell offer:" + error });
        } finally {
            session.endSession();
        }
    };
    
    
    
    exports.transactions = async (req, res) => {
        const allowedStatus = ['Active', 'Cancelled', 'Successful'];
        const status = req.query.status;
        const seller = req.query.seller;
        const buyer = req.query.buyer;
        const item = req.query.item;
        
        const filter = { };
        
        if (status !== undefined) {
            if (!allowedStatus.includes(status))
            return res.status(400).json({ error: 'Invalid status parameter.' });
            filter.status = status;
        }
        
        if (seller !== undefined) {
            filter.seller = seller;
        }
        
        if (buyer !== undefined) {
            filter.buyer = buyer;
        }
        
        if (item !== undefined) {
            filter.item = item;
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
        session.startTransaction();
        
        try {
            const transaction = await MarketTransaction.findOne({ _id: req.body.transaction_id });
            if (!transaction) {
                return res.status(404).send({ message: 'Transaction not found' });
            }
            
            const [buyer, seller] = await Promise.all([
                User.findOne({ username: req.body.buyer_name }),
                User.findOne({ _id: transaction.seller })
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
                return res.status(404).send({ message: "Buyer cannot buy his own item." });
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
            
            await session.commitTransaction();
            return res.status(200).json({ message: "Item bought sucessfully" });
            
        } catch (error) {
            await session.abortTransaction();
            console.error('Failed to buy', error);
            return res.status(500).json({ message: "Failed to buy: " + error });
        } finally {
            session.endSession();
        }
    };
    
    // body: {
    //   transaction_id: transaction._id
    //   seller: transaction.seller
    // }
    exports.cancel = async (req, res) => {
        console.log("CANCEL");
        
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
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

            if(!ownsItem(req.body.user.user_id, item_id))
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
            
            await session.commitTransaction();
            return res.status(200).json({ message: "Item sell offer cancelled sucessfully" });
            
        } catch (error) {
            await session.abortTransaction();
            console.error('Failed to cancel', error);
            return res.status(500).send({ message: "Failed to cancel: " + error });
        } finally {
            session.endSession();
        }
    };
