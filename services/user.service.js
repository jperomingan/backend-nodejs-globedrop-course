const User = require('../models/user.model/user.model')

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
        const user = await user.findOne(query)
        return user
    } catch(error) {
        console.log('error: ', error)
    }
};

