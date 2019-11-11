const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const randomstring = require('randomstring');

const accountSchema = mongoose.Schema({
    accNumber: {
        type: Number,
        unique: true,
        default: () => {
            return randomstring({
                length: 12,
                charset: 'numeric',
            });
        },
    },
    openingDate: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        default: 0,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    }
});

accountSchema.plugin(uniqueValidator);

const accountModel = mongoose.model('accounts', accountSchema);

module.exports = accountModel;