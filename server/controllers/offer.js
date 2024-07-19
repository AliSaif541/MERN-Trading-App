const { User } =  require("../models/user");
const { Trade } = require("../models/trade");
const { Offer } = require("../models/offer");

const createOffer = async (req, res) => {
    console.log(req.body);
    try {
        const newOffer = {
            user: req.body.username,
            cashOffered: req.body.cash,
            itemsOffered: req.body.itemsOffered,
            tradeOfferedFor: req.body.tradeOfferedFor,
        };
        
        const savedOffer = await new Offer(newOffer).save();
        const offerId = savedOffer._id;

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            await Offer.findByIdAndDelete(offerId);
            return res.status(404).json({ message: 'User not found' });
        }

        const trade = await Trade.findOne({ _id: req.body.tradeOfferedFor });
        if (!trade) {
            await Offer.findByIdAndDelete(offerId);
            return res.status(404).json({ message: 'Trade not found' });
        }
        
        trade.offers.push(offerId);
        user.offers_sent.push(offerId);
        
        if (req.body.cash > user.cash) {
            await Offer.findByIdAndDelete(offerId);
            return res.status(404).json({ message: 'Insufficient funds' });
        }
        user.cash -= req.body.cash;

        if (Array.isArray(req.body.tradesOffered)) {
            req.body.tradesOffered.forEach(item => {
                const index = user.number_of_items.indexOf(item);
                if (index !== -1) {
                    user.number_of_items.splice(index, 1);
                }
            });
        }

        await user.save();
        await trade.save();

        res.status(201).json({ message: 'Offer created successfully' });
    } catch (err) {
        console.error('Error creating trade:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getOffer = async (req, res) => {
    try {
        const offer = await Offer.findOne({_id: req.query._id});
        res.json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Trades' });
    }
}

module.exports = { createOffer, getOffer };