const {Sequelize,DataTypes}=require("sequelize");
const database=require('../database/database');

const contentstorage=database.define('contentstorage',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
    },
    link:{
        type:DataTypes.STRING,
        allowNull:false
    },
    filename:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports=contentstorage;
