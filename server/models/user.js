const mongoose = require('mongoose');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cash: {
        type: Number,
        required: true,
    },
    number_of_items: {
        type: [String],
        required: true,
    },
    trades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trade'
    }],
    offers_sent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }]
});

const User = mongoose.model('User', userSchema);
const userValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        username: Joi.string().required().label("Username"),
        password: passwordComplexity().required().label("Password"),
        cash: Joi.number().required().label("Cash"),
        number_of_items: Joi.array().items(Joi.string()).label("Number_of_items"),
        trades: Joi.array().items(Joi.string()).label("Trades")
    });

    return schema.validate(data);
};

module.exports = { User, userValidate };
