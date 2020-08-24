const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

router.post('/user', UserController.Register);
router.get('/users', UserController.GetAllUsersList);
router.get('/user/:_id', UserController.GetUserById);

module.exports = router;