const Organization = require('../models/organization.model')

const Create = async (data) =>  {
    try {
        const organization = await Organization.create(data)
        return organization
    } catch(error) {
        console.log('error: ', error)
    }
}

const Find = async (data) =>  {
    try {
        const organizations = await Organization.find({})
        return organizations
    } catch(error) {
        console.log('error: ', error)
    }
}

const FindOne = async (query) =>  {
    try {
        const organization = await Organization.findOne(query)
        return organization
    } catch(error) {
        console.log('error: ', error)
    }
}

module.exports = {
    Create,
    Find,
    FindOne
}