const Sequelize = require('sequelize');

const db = new Sequelize("userdb","postgres", "Jk@12345", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {max: 5, min:0, idle: 10000}
});

module.exports = db;