const express = require('express')
const router = express.Router()

const OrganizationController = require('../controllers/organization.controller')

router.get('/organization', OrganizationController.GetAllOrganizations);
router.post('/organization', OrganizationController.AddOrganization);
router.put('/organization/:organization_id', OrganizationController.UpdateOrganization)
router.delete('/organization/:organization_id', OrganizationController.DeleteOrganization)

module.exports = router;
