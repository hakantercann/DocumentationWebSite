const db = require('../models');
const authConfig = require('../config/auth.js');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

const User = db.users;

verifyToken = (req, res, next) => {
    let token = req.headers["access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        req.userID = decoded.id;
        next();
    });

}
isAdmin = async (req, res, next) => {
    let all_user_roles = [];
    let all_user_role_names = [];
    let current_user = await User.findByPk(req.body.userID);

    all_user_roles = await current_user.getRoles();

    for (let i = 0; i < all_user_roles.length; i++) {
        all_user_role_names.push(all_user_roles[i].roleName);
    }

    if (all_user_role_names.includes("admin")) {
        next();
        return;
    }
     
    res.status(403).send({
        message: "Require Admin Role"
    });

}

module.exports = {
    verifyToken,
    isAdmin
}
