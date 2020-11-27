const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('./models/user.model')
const bcrypt = require('bcryptjs');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne( {email})
            if(!user){
                return done(null, false)
            }
            const valid = user.password && (await bcrypt.compare(password, user.password))
            if(!valid){
                return done(null, false)
            }
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
    ))