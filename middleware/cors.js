const cors = require("cors");


const allowedOrigins = ['http://localhost:5000'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    //console.log(req.header('Origin'));
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);