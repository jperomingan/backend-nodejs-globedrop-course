const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const TokenService = require('../services/token.service');

const GetAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.Find({})
        return res.status(200).json({
            message: 'OK',
            data: users,
        })
    } catch (error) {
        console.log('error: ', error)
        return next(new Error(error.message));
    }
};

const GetOrganizationsByUser = async (req, res, next) =>  {
    const { user_id } = req.params;
    try {
        const organizations = await UserService.FindOneAndPopulate(
            { _id: user_id},
            'organizations'
        );
        return res.status(200).json({
            message: 'Ok',
            data: organizations,
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const GetUsersByType = async (req, res, next) => {
    const { user_type } = req.params;
    try{
        const users = await UserService.Find({
            userType: user_type,
        });
        return res.status(200).json({
            message: 'Ok',
            data: users,
        });
    } catch(error) {
        return next(new Error(error.message));
    }
};

const GetUserById = async(req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await UserService.FindOne({
            _id: user_id,
        });
        if(!user) {
            return res.status(404).json({
                message: 'User Not Found',
            });
        }
        return res.status(200).json({
            message: 'Ok',
            data: user,
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const Register = async (req, res) => {
    try {
        const {
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
            organizations,
        } = req.body;
        const existing_user = await UserService.FindOne({
            email,
        }); 
        if (existing_user) {
            return res.status(409).json({
                message: 'Email address already exist',
            });
        }
        const new_user = await UserService.Create({
            method: "local",
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
            organizations,
        });
        // const access_token = jwt.sign(new_user.toJSON(), process.env.SECRET_TOKEN, {
        //     expiresIn: '24h',
        // });

        // await TokenService.Create({ access_token });

        return res.status(200).json({
            message: 'Ok',
            user: new_user,
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};


module.exports = {
    GetAllUsers,
    GetOrganizationsByUser,
    GetUsersByType,
    GetUserById,
    Register,
};