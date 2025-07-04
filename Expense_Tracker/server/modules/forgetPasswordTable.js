const {Sequelize,DataTypes}=require('sequelize');
const database=require('../database/database');
const {v4:UUIDV4}=require('uuid')

const forgetpassword=database.define('forgetpassword',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        unique:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
});

module.exports=forgetpassword;