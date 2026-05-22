const User = require('../model/userModel.cjs');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


// REGISTER USER
const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please Provide Required data"
            });
        }

        // Validate Email
        let checkEmail = validator.isEmail(email);
        if (!checkEmail) {
            return res.status(400).json({
                message: "The Email is not Strong"
            });
        }

        // Validate Password
        let CheckPassword = validator.isStrongPassword(password);
        if (!CheckPassword) {
            return res.status(400).json({
                message: "Password is not strong"
            });
        }

        // Check user exists
        let CheckUser = await User.findOne({
            where: { email }
        });

        if (CheckUser) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        // Hash password
        let salt = await bcrypt.genSalt(10);
        let HashPassword = await bcrypt.hash(password, salt);

        // Create user
        let UserRegister = await User.create({
            name,
            email,
            password: HashPassword
        });

        const token = jwt.sign(
            { id: UserRegister.id },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        return res.status(200).json({
            message: "User Created",
            data: {
                token,
                user: UserRegister
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue",
            error: error.message
        });
    }
};


// LOGIN USER
const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please Provide Required Data"
            });
        }

        let DoesUserExist = await User.findOne({
            where: { email }
        });

        if (!DoesUserExist) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }

        let comparepassword = await bcrypt.compare(password, DoesUserExist.password);

        if (!comparepassword) {
            return res.status(400).json({
                message: "Entered Password is wrong"
            });
        }

        // JWT token
        const token = jwt.sign(
            { id: DoesUserExist.id },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        return res.status(200).json({
            message: "User Logged in",
            data: {
                token,
                user: DoesUserExist
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue",
            error: error.message
        });
    }
};


// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        let getUsers = await User.findAll();

        return res.status(200).json({
            message: "Successfully Got Users",
            data: getUsers
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue",
            error: error.message
        });
    }
};


// GET USER BY ID
const getUser = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Provide Id"
            });
        }

        let usercheck = await User.findOne({
            where: { id }
        });

        if (!usercheck) {
            return res.status(400).json({
                message: "User Does not exist"
            });
        }

        return res.status(200).json({
            message: "User does exist",
            data: usercheck
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue"
        });
    }
};


// ADD USER (same logic as yours)
const addUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please Provide Email"
            });
        }

        let checkuser = await User.findByPk(email);

        if (checkuser) {
            return res.status(400).json({
                message: "User already exist"
            });
        }

        let user = await User.create({
            email
          
        });

        return res.status(200).json({
            message: "User is added",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue"
        });
    }
};


// UPDATE USER
const updateData = async (req, res) => {
    try {
        let { id } = req.params;
        let { email, age } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Provide id"
            });
        }

        if (!email || !age) {
            return res.status(400).json({
                message: "Please Provide data to Update"
            });
        }

        let checkuser = await User.findByPk(id);

        if (!checkuser) {
            return res.status(400).json({
                message: "User does not Exist"
            });
        }

        let updatedata = await User.update(
            { email, age },
            { where: { id } }
        );

        return res.status(200).json({
            message: "User Updated Successfully",
            data: updatedata
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue"
        });
    }
};


// DELETE USER
const deleteuser = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Please Provide id"
            });
        }

        let deleteuser = await User.destroy({
            where: { id }
        });

        return res.status(200).json({
            message: "The user has been deleted",
            data: deleteuser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Issue"
        });
    }
};


// EXPORTS
module.exports = {
    getAllUsers,
    getUser,
    updateData,
    deleteuser,
    addUser,
    register,
    login
};