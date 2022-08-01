module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("logins", {
        userID: {
            type: Sequelize.INTEGER,
            defaultValue: -99,
        },
        login_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        login_from: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        fullname: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: true,
    });

    return Login;
};