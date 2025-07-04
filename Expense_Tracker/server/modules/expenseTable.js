const {Sequelize,DataTypes}=require('sequelize');
const database=require('../database/database');

const ExpenseTable=database.define('expense_table',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports=ExpenseTable;