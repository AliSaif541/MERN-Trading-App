const mongoose = require('mongoose');
const Joi = require("joi");

const tradeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    conditions: {
        type: [String],
        required: true
    },
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    acceptedOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }
});

const Trade = mongoose.model('Trade', tradeSchema);
const tradeValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
        conditions: Joi.array().items(Joi.string()).required().label("Conditions"),
        offers: Joi.array().items(Joi.string()).label("Offers"),
        acceptedOffer: Joi.string().label("AcceptedOffer")
    });
    return schema.validate(data);
};

module.exports = { Trade, tradeValidate };
