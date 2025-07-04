const{Sequelize,DataTypes}=require('sequelize');
const database=require('../database/database');
const paymenttable=database.define('payments',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    order_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    payment_session_id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    order_amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    customer_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    payment_status:{
        type:DataTypes.STRING,
    }
})

module.exports=paymenttable;