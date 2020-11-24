const UserService = require('../services/user.service');

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserService.Find({})
        return res.status(200).json({
            message: 'OK',
            data: users,
        })
    } catch (error) {
        console.log('error: ', error)
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

const GetUsersByType = async (req, res) => {
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
        console.log(error.message);
    }
};

const GetUserById = async(req, res) => {
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
        return res.status(200).json({
            message: 'Ok',
            data: user,
        });
    } catch (error) {
        console.log(error.message);
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
                message: 'Email address already exist',
            });
        }
        const new_user = await UserService.Create({
            username,
            name,
            email,
            password,
            language,
            country,
            userType,
        });

        return res.status(200).json({
            message: 'User Inserted',
        });
    } catch (error) {
        return next(new Error(error.message));
    }
};

const UpdateUser = async (req, res) => {
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
        } = req.body;

        const user = await UserService.FindOne({
            _id: user_id,
        });
        console.log('user: ', user);

    if (!user) {
        return res.status(404).json({
            message: 'User Not Found',
        });
    }

    return res.status(200).json({
        message: 'User Updated',
    });
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await UserService.FindOne({
            _id: user_id,
        })
        console.log('user: ', user);
        if(!user) {
            return res.status(404).json({
                message: 'User Not Found',
            });
        }
        await UserService.DeleteOne({ _id: user_id });

        return res.status(200).json({
            message: 'User Deleted',
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    GetAllUsers,
    GetOrganizationsByUser,
    GetUsersByType,
    GetUserById,
    Register,
};