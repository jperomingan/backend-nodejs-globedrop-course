const { query } = require('express')
const Organization = require('../models/organization.model')

const Find = async () => {
    const organizations = await Organization.find({})
    return organizations
}

const FindOne = async (query) => {
    const organization = await Organization.findOne(query)
    return organization
}

const Create = async (query) => {
    const organization = await Organization.create(query)
    return organization
}

const FindOneAndUpdate = async (filter, data) => {
    const organization = await Organization.findOneAndUpdate(filter, {...data})
    return organization
}

const DeleteOne = async (filter) => {
    const organization = await Organization.deleteOne(filter)
    return organization
}

const FindOneandPopulate = async (query, populate_field) => {
    const organization = await Organization.findOne(query).populate(populate_field)
    const admins = organization.admins
    return admins
}

module.exports = {
    Find,
    FindOne,
    Create,
    FindOneAndUpdate,
    DeleteOne,
    FindOneandPopulate
}