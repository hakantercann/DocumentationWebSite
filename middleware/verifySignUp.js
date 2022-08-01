const db = require('../models');
const ROLES = db.ROLES;

const User = db.users;

checkExistID = (req, res, next) =>{
    //userıd
    User.findOne({
        where: {
            userID: req.body.userID
        }
    }).then(user =>{
        if(!user){
            res.status(400).send({
                message: "user didnt find ss"
            });
            return;
        }
        next();
    });
}
checkDuplicateUsername = (req, res, next) =>{
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user =>{
        if(user){
            res.status(400).send({
                message: "usernmae already in use"
            });
            return;
        }
        next();
    });
}
checkRolesExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Role does not exitst" + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
}


module.exports = {
    checkDuplicateUsername,
    checkRolesExisted,
    checkExistID
}