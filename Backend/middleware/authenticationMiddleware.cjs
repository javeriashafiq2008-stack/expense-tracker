const jwt = require("jsonwebtoken");
const User = require("../model/userModel.cjs");

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        token = token.split(" ")[1];

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED TOKEN:", verifyToken);

        const user = await User.findOne({
            where: { id: verifyToken.id }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

       
        req.user = user;
        req.userId = user.id;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
};

module.exports = authMiddleware;