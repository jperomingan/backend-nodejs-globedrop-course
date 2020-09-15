const User = require('../models/user.model')
const { query } = require('express')
const { populate } = require('../models/user.model')
const { DeleteOne } = require('./organization.service')

const Create = async (data) =>  {
    try {
        const user = await User.create(data)
        return user
    } catch(error) {
        console.log('error: ', error)
    }
}

const Find = async (data) =>  {
    try {
        const users = await User.find({})
        return users
    } catch(error) {
        console.log('error: ', error)
    }
};

const FindOne = async (query) =>  {
    try {
        const user = await User.findOne(query)
        return user
    } catch(error) {
        console.log('error: ', error)
    }
};

const FindOneAndUpdate = async (filter, data) =>  {
    try {
        const user = await User.findOneAndUpdate(filter, {
            ...data
        });
        return user;
    } catch(error) {
        console.log('error: ', error)
    }
};

const DeleteOne = async (filter) => {
    try {
        const organization = await Organization.deleteOne(filter);
        return organization
    } catch (error) {
        throw Error(error)
    }
};

const FindOneandPopulate = async (query, populate_field) => {
    const user = await (await User.findOne(query)).populated(populate_field)
    const organizations = user.organizations
    return organizations
}

module.exports = {
    Create,
    Find,
    FindOne,
    FindOneAndUpdate,
    DeleteOne,
    FindOneandPopulate
};

