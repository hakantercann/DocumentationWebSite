const config = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        port: config.PORT,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
/*
sequelize.sync({force: true})
    .then(()=>{
        console.log('success');
    })*/
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.logins = require('../models/login.model.js')(sequelize, Sequelize);
db.videos = require("../models/video.model.js")(sequelize, Sequelize);
db.documents = require('../models/document.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleID",
    otherKey: "userID"
});
db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userID",
    otherKey: "roleID"
});
db.ROLES = ["user", "admin"];
module.exports = db;