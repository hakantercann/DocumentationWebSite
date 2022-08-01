module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userPassword: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        personelNumber: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }, 
    {
        defaultValue: false,
        initialAutoIncrement: 1000,
        timestamps: false,
    });

    return User;
};