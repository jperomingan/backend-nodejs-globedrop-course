const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/user', UserController.Register);

module.exports = router;