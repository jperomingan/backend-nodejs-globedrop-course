const { database } = require('firebase-admin')
const OrganizationService = require('../services/organization.service')

const GetAdminsByOrganization = async (req, res) => {
    const { organization_id } = req.params
    try {
        const admins = await OrganizationService.FindOneandPopulate(
            { _id : organization_id},
            'admins'
        )
        return res.status(200).json({
            message: 'Ok',
            data: admins
        })
    } catch (error) {
        console.log('Error: ', error)
    }
}

const GetAllOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationService.Find()
        return res.status(200).json({
            message: 'OK',
            data: organizations
        })
    } catch (error) {
        console.log('error: ', error)
    }
}

const AddOrganization = async (req, res) => {
    try {
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
            admins,
        } = req.body

        const existing_organization = await OrganizationService.FindOne({
            org_name
        })

        console.log('existing_organization: ', existing_organization);

        if(existing_organization){
            return res.status(409).json({
                message: 'Data exists'
            });
        }

        await OrganizationService.Create({
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
            admins,
        })

        return res.status(200).json({
            message: 'Data inserted'
        });

    } catch (error) {
        console.log('error: ', error)
    }
}

const UpdateOrganization = async (req, res) => {
    try {
        const {organization_id} = req.params

        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
            admins,
        } = req.body

        const organization = await OrganizationService.FindOne({
            _id: organization_id
        })

        if(!organization) {
            return res.status(404).json({
                message: 'Data not found',
            });
        }

        await OrganizationService.FindOneAndUpdate(
            { _id: organization_id },
            {
                org_name,
                org_description,
                org_country,
                org_city,
                org_picture,
                admins,
            }
        )

        return res.status(200).json({
            message: 'Data updated'
        });

    } catch (error) {
        console.log('error: ', error);
    }
}

const DeleteOrganization = async (req, res) => {
    try {
        const { organization_id } = req.params
        await OrganizationService.DeleteOne({ _id: organization_id })
        return res.status(200).json({
            message: 'Data deleted',
        });
    } catch (error) {
        console.log('error: ', error);
    }
}


module.exports = {
    GetAllOrganizations,
    AddOrganization,
    UpdateOrganization,
    DeleteOrganization,
    GetAdminsByOrganization
}