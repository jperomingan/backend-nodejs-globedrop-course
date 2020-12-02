const express = require('express');
const { app } = require('firebase-functions');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { isAuthenticated } = require('../utils/middleware')
const passport = require('passport');
require('../passport-config')

router.post('/user', UserController.Register);
router.get('/user/:user_type', UserController.GetUsersByType);
router.get('/user/:user_id', UserController.GetUserById);
router.put('/user/:user_id', UserController.UpdateUser);
router.delete('/user/:user_id', UserController.DeleteUser);
router.get('/users',isAuthenticated, UserController.GetAllUsers);
router.get('/user/:user_id/organizations', UserController.GetOrganizationsByUser);
// router.post('/user/login', UserController.Login);
router.post('/user/login', passport.authenticate('local', {session: false}), UserController.Login)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure'}),
    function(req, res) {
        // Successfull authentication, redirect home
        // res.redirect('/');
        console.log('req.passport.session: ', req._passport.session);
        return res.status(200).json({message: 'Ok', access_token: req._passport.session.user});
    });

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failure'}),
    function(req, res) {
        // Successfull authentication, redirect home
        // res.redirect('/');
        console.log('req.passport.session: ', req._passport.session);
        return res.status(200).json({message: 'Ok', access_token: req._passport.session.user});
    });

router.post('/user/logout', UserController.Logout);

// app.use(isAuthenticated)
// router.put('/user/:user_id', UserController.UpdateUser);
// router.delete('/user/:user_id', UserController.DeleteUser);
// router.get('/users',isAuthenticated, UserController.GetAllUsers);

module.exports = router;