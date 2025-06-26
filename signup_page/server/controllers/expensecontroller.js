const ExpenseTable=require('../modules/expenseTable');

const addtoexpense=async(req,res)=>{
    try {
        const {amount,category,description}=req.body;
        const insertintoexpense=await ExpenseTable.create({
            amount,
            category,
            description,
            userId:req.user.id
        });
        res.status(200).json({insertintoexpense,message:'Expense added to the table'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const retriveexpense=async (req,res)=>{
    try {
        const listOfExpenses=await ExpenseTable.findAll({
            where:{
                userId:req.user.id
            }
        });
        res.status(200).json(listOfExpenses);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteexpense=async(req,res)=>{
    try {
        const id=req.body.id;
        const deleteValue=await ExpenseTable.destroy({
            where:{
                id:id,
                userId:req.user.id
            }
        });
        res.status(200).json({deleteValue,message:'Expense deleted from the Table'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports={
    addtoexpense,
    retriveexpense,
    deleteexpense
}