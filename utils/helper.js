const jwt = require('jsonwebtoken')

const jwtVerify = (token) => 
new Promise((resolve, reject) => {
    jwt.verify(token, 'secretkey', (error, decoded) => {
        if(error) {
            reject(error.message)
        }
        resolve(decoded)
    })
})

module.exports = {
    jwtVerify,
};