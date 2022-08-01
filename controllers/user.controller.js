const db = require('../models');
const bcrypt = require("bcrypt");
//create main model

const User = db.users;
const jwt = require('jsonwebtoken');
const Role = db.role;
const {Op} = require('sequelize');
const config = require('../config/auth');
//main work 
const deleteUser = async(req, res)=>{
    await User.destroy({
        where:{
            userID: req.params.userID
        }
    }).then(num =>{
        if(!num){
            return res.send("Cannot delete")
        }
        res.status(200).send({
            message: "User got deleted"
        });
    }).catch(err =>{
        res.status(500).send({
            message: err
        });
    })
}
const searchUser = async(req, res) =>{
    await User.findAll({
        where: {
            [Op.or]: [
               {
                    username: 
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },  
                {
                    firstName:
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },   
                {
                    lastName:
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },   
                {
                    personelNumber:
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },  
                {
                    mail:
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },  
            ]
         }
    })
    .then(data =>{
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving videos."
        });
    });
}
const resetPassword = (req, res) =>{
    let attributes = {
        userPassword: bcrypt.hashSync(req.body.password, 8)
    }
    User.update(attributes, {
        where:{
            userID: req.body.userID
        }
    }).then(num =>{
        if(num ==1){
            return res.status(200).send("got updated");
        }
        else{
            return res.status(400).send("something is gone wrong");
        }
    }).catch(err =>{
        res.send(err);
    });
}
const sendMail = (req, res) =>{
    User.findOne({
        where:{
            mail: req.body.mail
        }
    }).then(user =>{
        if(!user){
            return res.status(400).send({message:"Mail not found"});
        }
        const nodeMailer = require('nodemailer');
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: 'osmannejat718@gmail.com',
                pass: '1234Asdf'
            }
        });
        let infos = {
            from: "osmannejat718@gmail.com",
            to: req.body.mail,
            subject: "password reset",
            text: "link.link"
        }/*
        transporter.sendMail(infos, (err, inf)=>{
            if(err) throw err;
            console.log('sended ', inf.response);
        });*/
    }).catch(err =>{
        res.status(500).send({message: err});
    });
}
const signin = (req, res) =>{
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user =>{
        if(!user){
            console.log('here3');
            return res.status(400).send({message: "User not found"});
        }
        var passIsValid = bcrypt.compareSync(
            req.body.password,
            user.userPassword
        );
        if(!passIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
        
        var token = jwt.sign({username: user.username}, config.secret, {
            expiresIn: 86400
        });
        var authorities = [];
            res.status(200).send({ message:{
                userID: user.userID,
                accessToken: token}
        });
    }).catch(err =>{
        res.status(500).send({message: err});
    });
}
const addUser = async (req, res) =>{
    let info = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userPassword: bcrypt.hashSync(req.body.userPassword, 8),
        mail: req.body.mail,
        companyNumber: req.body.companyNumber,
        personelNumber: req.body.personelNumber
    }
    console.log(info);
    const user = await User.create(info)
        .then(user =>{
            if(req.body.roles){
                Role.findAll({
                    attributes: ['roleID', 'roleName'],
                    where: {
                        roleName:{
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(()=>{
                        res.send("User was registered successfully");
                    });
                });            
            }
            else{
                user.setRoles([1]).then(()=>{
                    res.send("User was registered successfully");
                });
            }    
        })
        .catch(err =>{
            res.status(500).send(err);
        });
        
}



const getAllUsers = async (req, res) =>{
    /*    let userList = await User.findAll({
        attriutes:[
            'username',
        ]
    });*/
    let userList = await User.findAll({});
    res.status(200).send(userList);
}

module.exports = {
    getAllUsers,
    addUser,
    signin,
    sendMail, 
    resetPassword,
    searchUser,
    deleteUser
}