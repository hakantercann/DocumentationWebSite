const userController = require('../controllers/user.controller.js');
const express = require('express');
const router = express.Router();
const {verifySignUp} = require('../middleware');


router.use((req, res, next) =>{
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, origin, content type, accept"
    );
    next();
});

router.post('/search/user', userController.searchUser);

router.post('/add/user', 
[
    verifySignUp.checkDuplicateUsername,
    verifySignUp.checkRolesExisted
],userController.addUser);

router.post('/forget/pass', userController.sendMail);
router.put('/reset/pass',
[
    verifySignUp.checkExistID
],
 userController.resetPassword);
router.post('/login', userController.signin);

router.get('/list/users', userController.getAllUsers);

router.delete('/delete/:userID', userController.deleteUser)
module.exports = router;