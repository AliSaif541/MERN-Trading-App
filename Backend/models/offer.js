const mongoose = require('mongoose');
const Joi = require("joi");

const offerSchema = new mongoose.Schema({
    user: {
        type: "String",
        required: true
    },
    itemsOffered: [{
        type: [String]
    }],
    cashOffered: {
        type: Number,
        default: 0
    },
    tradeOfferedFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trade',
        required: true
    }
});

const Offer = mongoose.model('Offer', offerSchema);
const offerValidate = (data) => {
    const schema = Joi.object({
        user: Joi.string().required().label("User"),
        itemsOffered: Joi.array().items(Joi.string()).label("ItemsOffered"),
        cashOffered: Joi.number().label("CashOffered"),
        tradeOfferedFor: Joi.string().required().label("TradeOfferedFor")
    });

    return schema.validate(data);
};

module.exports = { Offer, offerValidate };
