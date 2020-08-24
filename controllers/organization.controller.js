const OrganizationService = require('../services/organization.service');
const organizationService = require('../services/organization.service');

const AddOrganization = async (req, res) =>  {
    try {
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
        } = req.body

        const existing_organization = await OrganizationService.FindOne({
            org_name,
        })

        if(existing_organization) {
            return res.status(409).json ({
                message: 'Data Exists'
            })
        }

        const new_organization = await OrganizationService.Create({
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
        })

        return res.status(200).json({
            message: 'New Organization Inserted'

        });

    } catch(error) {
        console.log('error: ', error);
    }
};

const GetAllOrganizations = async (req, res) => {
    try {
        const organizations = await organizationService.Find()
        return res.status(200).json({
            message: 'All Organization',
            data: organizations
        })
    } catch (error) {
        console.log('error: ', error);
    }
}

const GetOrganizationById = async (req, res) => {
    try {
        const { _id } = req.params;
        const organizations = await organizationService.FindOne({
            _id,
        });
        return res.status(200).json({
            message: 'Organization Fetched',
            data: organizations,
        });
    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = {
    AddOrganization,
    GetAllOrganizations,
    GetOrganizationById
}