const bcrypt = require('bcrypt');
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
        type: Sequelize.BIGINT,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
})

// User.pre("save", (next) =>{
//   if(!this.isModified("password")) return next();
//   this.password = bcrypt.hashSync(this.password, 8)
//   return next();
// })


module.exports = User;