const Joi = require('@hapi/joi');
const Client = require('./models/clientDetailsModel');
const { removeNullKeys } = require('../../../utils/index');

const CREATE_CLIENT_VALIDATOR = Joi.object({
    name: Joi.string().required(),
    id: Joi.number().required(),
    dateOfBirth: Joi.date().required(),
});

const UPDATE_CLIENT_VALIDATOR = Joi.object({
    name: Joi.string().optional(),
    id: Joi.number().optional(),
});

const fetch = async (params = {}, { lean = true } = {}) => {
    const {
        regStartDate = null,
        regEndDate = null,
        birthStartDate = null,
        birthEndDate = null,
        limit = 100,
        pageNumber = 0,
    } = params;

    const newParams = removeNullKeys({
        registrationDate: {
            $gte: regStartDate,
            $lte: regEndDate,
        }, 
        dateOfBirth: {
            $gte: birthStartDate,
            $lte: birthEndDate,
        },
    });

    const options = {
        lean,
        limit,
        skip: (limit * pageNumber),
    };

    const clients = await Client
        .find(newParams, null, options)
        .exec();
    
    return clients || [];
};

const findById = async (id, {  lean = true } = {}) => {
    const client = await Client.findById(id).exec();

    if (client) return lean ? client.toObject() : client;
    return null;
};

const create = async (params = {}, { lean = true } = {}) => {
    const {
        name,
        id,
        dateOfBirth,
    } = params;

    // Validate
    const newParams = await CREATE_CLIENT_VALIDATOR.validateAsync({
        name,
        id,
        dateOfBirth,
    });

    const client = await new Client(newParams).save();

    return lean ? client.toObject() : client;
};

const update = async (key, params = {}) => {
    const client = await findById(key, { lean: false });

    if (!client) {
        throw new Error(`Could not find client with id ${id}`);
    }

    const {
        name,
        id,
    } = params;

    const updateParams = await UPDATE_CLIENT_VALIDATOR.validateAsync(removeNullKeys({
        name,
        id,
    }));

    if (name) client.name = name;
    if (id) client.id = id;

    await client.save();
};

module.exports = {
    fetch,
    findById,
    create,
    update,
};
