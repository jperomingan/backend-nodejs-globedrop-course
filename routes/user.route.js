const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/user', UserController.Register);
router.get('/user/:user_type', UserController.GetUsersByType);
router.get('/user/:user_id', UserController.GetUserById);
router.put('/user/:user_id', UserController.UpdateUser);
router.delete('/user/:user_id', UserController.DeleteUser);
router.get('/users', UserController.GetAllUsers);
router.get('/user/:user_id/organizations', UserController.GetOrganizationsByUser);
router.post('/user/login', UserController.Login);
router.post('/user/logout', UserController.Logout);

module.exports = router;