const Sequelize = require('sequelize');
const db = require('../config/dbconfig');

const User = db.define("user", {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // isVerified: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: true,
    //     defaultValue: false
    // }
})

module.exports = User;