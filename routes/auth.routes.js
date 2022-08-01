const {authJwt} = require("../middleware");
const authController = require("../controllers/auth.controller.js");
const router = require('express').Router();

/*
    app.use(cors.corsWithOptions, function(req, res, next) {
        res.header({
            "Access-Control-Allow-Headers": process.env.HTTP_ACCESS_CONTROL_ALLOW_HEADERS,
            "Access-Control-Allow-Origin": process.env.HTTP_ACCESS_CONTROL_ALLOW_ORIGIN,
            "Access-Control-Allow-Methods": process.env.HTTP_ACCESS_CONTROL_ALLOW_METHODS
        });
        next();
    });
*/


router.get("/test/all",  authController.allAccess);

router.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], authController.adminAccess);
router.get("/test/user", [authJwt.verifyToken], authController.userAccess);

module.exports = router;