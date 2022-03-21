const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Variant = sequelize.define('variant', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: { 
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    onset_date: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

module.exports = Variant;
