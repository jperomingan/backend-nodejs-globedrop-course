const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const User = require('../models/user.model');

router.post('/user', UserController.Register);
router.get('/user/:user_type', UserController.GetUsersByType);
router.get('/user/:user_id', UserController.GetUserById);
router.put('/user/:user_id', UserController.UpdateUser);
router.delete('/user/:user_id', UserController.DeleteUser);
router.get('/users', UserController.GetAllUsers);

module.exports = router;