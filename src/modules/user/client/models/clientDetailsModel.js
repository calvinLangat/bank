const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    identificationNumber: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
        required: [true, 'registration Date is required'],
    },
});

clientSchema.plugin(uniqueValidator);

const clientModel = mongoose.model('client', clientSchema);

module.exports = clientModel;