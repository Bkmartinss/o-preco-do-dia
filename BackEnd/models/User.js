const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
       type: DataTypes.STRING,
       allowNull: false 
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false 
    }
});

module.exports = User;