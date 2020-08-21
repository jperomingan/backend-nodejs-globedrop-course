const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

router.get('/user', UserController.Register);


module.exports = router;