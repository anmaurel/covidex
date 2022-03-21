const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: 'db',
    dialect: 'mysql',
    database: 'covidex',
    username: 'test',
    password: 'mypswdtest',
    define: {
        timestamps: false,
    },
});

module.exports = sequelize;
