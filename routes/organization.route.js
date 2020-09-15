const express = require('express')
const OrganizationController = require('../controllers/organization.controller')
const router = express.Router()

router.post('/organization', OrganizationController.AddOrganization);
router.get('/organizations', OrganizationController.GetAllOrganizations);
router.get('/organization/:_id', OrganizationController.GetOrganizationById);

// router.put(
//     '/organization/:organization_id',
//     OrganizationController.UpdateOrganization
// );
// router.delete(
//     '/organization/:organization_id',
//     OrganizationController.DeleteOrganization
// );

module.exports = router;

