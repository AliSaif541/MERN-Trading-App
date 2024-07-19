const { User } =  require("../models/user");
const { Trade } = require("../models/trade");
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const browseTrades = async (req, res) => {
    try {
        const trades = await Trade.find({});
        res.json(trades);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching Trades' });
      }
}

const specificTrade = async (req, res) => {
    try {
        const trades = await Trade.find({username: req.query.username});
        res.json(trades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Trades' });
    }
}

const createTrade = async (req, res) => {
    try {
        const newTrade = {
            username: req.body.username,
            title: req.body.title,
            description: req.body.description,
            conditions: req.body.conditions,
            offers: [],
            acceptedOffer: null
        };
        const savedTrade = await new Trade(req.body).save();
        const tradeId = savedTrade._id;

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.trades.push(tradeId);
        await user.save();

        res.status(201).json({ message: 'Trade created successfully', trade: newTrade });
    } catch (err) {
        console.error('Error creating trade:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const offerTrade = async (req, res) => {
    try {
        const trades = await Trade.find({_id: req.query._id});
        res.json(trades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Trades' });
    }
}

const closeTrade = async (req, res) => {

}

const updateTrade = async (req, res) => {

}

module.exports = { browseTrades, specificTrade, createTrade, closeTrade, updateTrade, offerTrade };