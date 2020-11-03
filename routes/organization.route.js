const express = require('express')
const router = express.Router()

const OrganizationController = require('../controllers/organization.controller')

router.get('/organization', OrganizationController.GetAllOrganizations);
router.post('/organization', OrganizationController.AddOrganization);

module.exports = router;

