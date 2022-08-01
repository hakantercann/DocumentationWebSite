const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secret: process.env.TOKEN_SECRET,
    secretRefresh: process.env.TOKEN_SECRET_REFRESH,
    expiresIn: process.env.TOKEN_EXPIRE_IN,
    refreshTokenExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_IN
};