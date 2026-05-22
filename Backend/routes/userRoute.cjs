const express = require("express");
const userRouter = express.Router();

const {
    register,
    login,
    getAllUsers,
    getUser,
    addUser,
    updateData,
    deleteuser
} = require("../controllers/userController.cjs");
const  authMiddleware  = require("../middleware/authenticationMiddleware.cjs");

// routes

userRouter.get("/",getAllUsers);

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/:id",  getUser);

userRouter.post("/", addUser);

userRouter.put("/:id",  updateData);

userRouter.delete("/:id",  deleteuser);

module.exports = userRouter;