const { Sequelize, DataTypes } = require('sequelize')

const handler = new Sequelize('data','root','',{dialect: 'mysql', host: 'localhost'})

exports.table = handler.define('loginInfo',{
    'id':{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    'username':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'password':{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

exports.table2 = handler.define('userInfo',{
    'id':{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    'name':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'age':{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})