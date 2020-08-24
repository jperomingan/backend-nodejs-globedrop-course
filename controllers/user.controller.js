/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/user.service');
const userService = require('../services/user.service');
const User = require('../models/user.model');

const GetAllUsersList = async (req, res, next) => {
    try {
        const users = await UserService.Find({});

        return res.status(200).json({
            message: 'Ok',
            data: users,
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const GetUserByType = async (req, res, next) => {
    try {
        const users = await UserService.Find({
            userType: user_type,
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const GetUserById = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await userService.FindOne({
            _id,
        });
        console.log('user: ', user);
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

const Register = async (req, res, next) => {
    try {
        const {
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
        } = req.body;

        const existing_user = await UserService.FindOne({
            email,
        });
        if (existing_user) {
            return res.status(409).json({
                message: 'User with this email already exist',
            });
        }

        await UserService.Create({
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
        });

        return res.status(200).json({
            message: 'Ok',
            data: 'User Inserted',
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const UpdateUser = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const {
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
            organizations,
        } = req.body

        const user = await UserService.FindOne({
            _id: user_id,
        });
        console.log('user: ', user);
        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
            });
        }

        await UserService.FindOneAndUpdate(
            { _id: user_id },
            {
                username,
                name,
                email,
                password,
                language,
                country,
                userType,
                organizations,
            }
        );

        return res.status(200).json({
            message: 'Ok',
            data: 'User Updated',
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const DeleteUser = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const user = await UserService.FindOne({
            _id: user_id,
        });
        console.log('user: ', user);
        if(!user) {
            return res.status(404).json({
                message: 'User Not Found',
            });
        }

        await UserService.DeleteOne({ _id: user_id });

        return res.status(200).json({
            message: 'Ok',
            data: 'User Deleted',
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            });
            const input = {
                email,
                password,
            };
            await schema.validateAsync(input);
        } catch (error) {
            return res.status(400).json({
                message: 'Bad user input: ' + error.message
            })
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = {
    GetAllUsersList,
    GetUserByType,
    GetUserById,
    Register,
    UpdateUser,
    DeleteUser,
    Login
}