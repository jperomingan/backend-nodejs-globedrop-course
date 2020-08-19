const express = require('express')
const OrganizationController = require('../controllers/organization.controller')
const UserController = require('../controllers/user.controller')
const router = express.Router()

router.post('/organization', OrganizationController.AddOrganization);
router.get('/organizations', OrganizationController.GetAllOrganizations);
router.get('/organization/:_id', OrganizationController.GetOrganizationsById);
router.get('/user', UserController.GetAllUsersList);


module.exports = router;

