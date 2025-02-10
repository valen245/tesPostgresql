const {DataTypes} = require('sequelize')
const sequelize = require('../models/index')

//define model user
const User = sequelize.define('User', {
    id : {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isadmin : {
        type: DataTypes.STRING,
        allowNull : false,
    },
  }, {
    tableName: 'users',
    timestamps:false,
  })

module.exports = User