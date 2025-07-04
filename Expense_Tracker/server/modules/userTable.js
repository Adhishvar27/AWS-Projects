const {Sequelize,DataTypes}=require('sequelize');
const database=require('../database/database');

const usertable=database.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    premium:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    totalamount:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
        allowNull:false
    }
});

module.exports=usertable;