const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    charset: 'utf8',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};