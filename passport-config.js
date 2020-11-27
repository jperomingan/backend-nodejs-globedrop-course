const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/user.model')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('profile: ', profile)
            const existingUser = await User.findOne({ googleId: profile.id });
            if(existingUser) {
                console.log('User exists')

                const access_token = jwt.sign(existingUser.toJSON(), 'secretkey', {
                    expiresIn: '24h',
                });

                return done(null, access_token)
            } else {
                const newUser = new User({
                    method: 'google',
                    email: profile.emails[0].value,
                    google: {
                        id: profile.id
                    }
                })
                await newUser.save()

                const access_token = jwt.sign(newUser.toJSON(), 'secretkey', {
                    expiresIn: '24h',
                });
                return done(null, access_token);
            }
        } catch (error) {
            done(error, false);
        }
    }
))