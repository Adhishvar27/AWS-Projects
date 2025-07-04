
const ExpenseTable = require('../modules/expenseTable');
const UserTable = require('../modules/userTable');
const ContentTable=require('../modules/contentTable');
const sequelize = require('../database/database');
const {awsS3Services}=require('../services/S3Services');


const addtoexpense = async (req, res) => {
    const transaction =await sequelize.transaction();
    try {
        const { amount, category, description } = req.body;
        const insertintoexpense = await ExpenseTable.create({
            amount,
            category,
            description,
            userId: req.user.id
        }, { transaction: transaction });
        await UserTable.update(    //-------> for easy purpose create and store the total expenses in user table
            { totalamount: sequelize.literal(`totalamount + ${amount}`) },
            {
                where: {
                    id: req.user.id
                },
                transaction: transaction
            }
        )
        await transaction.commit();
        res.status(200).json({ insertintoexpense, message: 'Expense added to the table' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}

const retriveexpense = async (req, res) => {
    try {
        const page=parseInt(req.query.page)||1
        const limit=parseInt(req.query.limit)||3;
        const offset=(page-1)*limit
        const {count,rows} = await ExpenseTable.findAndCountAll({
            where: {
                userId: req.user.id
            },
            limit,
            offset
        });
        res.status(200).json({
            expense:rows,
            currentpage:page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteexpense = async (req, res) => {
    const transaction =await sequelize.transaction();
    try {
        const id = req.body.id;
        const expense = await ExpenseTable.findOne({
            where: {
                id: id, userId: req.user.id
            }, transaction: transaction
        });
        const deleteValue = await ExpenseTable.destroy(
            { where: { id: id, userId: req.user.id }, transaction: transaction });
        await UserTable.update({
            totalamount: sequelize.literal(`totalamount - ${expense.amount}`),
        }, {
            where: {
                id: req.user.id
            }, transaction: transaction
        }
        )
        await transaction.commit();
        res.status(200).json({ deleteValue, message: 'Expense deleted from the Table' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}

const downloadexpense=async(req,res)=>{
    try {
        const expenselist=await ExpenseTable.findAll({where:{userId:req.user.id}});
        const stringifyData=JSON.stringify(expenselist);
        const filename=`Expenses${req.user.id}/${new Date().toISOString()}.txt`;
        const fileURL = await awsS3Services(stringifyData, filename);
        await ContentTable.create({
            userId:req.user.id,
            link:fileURL,
            filename: filename
        })
        res.status(200).json({fileURL:fileURL,success:true});
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
}

const downloadedlist=async (req,res)=>{
    try {
        const {count,rows}=await ContentTable.findAndCountAll({
            where:{userId:req.user.id},
            order:[['id','DESC']],
            limit:5
        })
        res.status(200).json({result: rows,count:count});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    addtoexpense,
    retriveexpense,
    deleteexpense,
    downloadexpense,
    downloadedlist
}