const express = require('express')
const OrganizationController = require('../controllers/organization.controller')
const router = express.Router()

router.post('/organization', OrganizationController.AddOrganization)

module.exports = router;

