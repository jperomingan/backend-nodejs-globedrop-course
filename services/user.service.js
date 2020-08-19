const User = require('../models/user.model/user.model')

const Create = async (data) =>  {
    try {
        const user = await user.create(data)
        return user
    } catch(error) {
        console.log('error: ', error)
    }
}