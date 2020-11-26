const { jwtVerify } = require('../utils/helper')

const isAuthenticated = async (req, res, next) => {
    const authorization = req.headers['x-access-token'] || req.headers.authorization;
    
    const token = 
    authorization && 
    authorization.startsWith('Bearer') && 
    authorization.split(' ')[1];

    if (token) {
        try {
            req.decoded = await jwtVerify(token)
            return next()
        } catch (error) {
            console.log('Error: ', error);
            return (res.status(400).json({
                message: 'Invalid Token'
            }))
        }
    }
    return res.status(500).json({
        message: 'Auth token is not supplied'
    })
};

module.exports = {
    isAuthenticated,
}