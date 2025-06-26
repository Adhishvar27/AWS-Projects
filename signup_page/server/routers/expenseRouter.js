const express=require('express');
const router=express.Router();

const expensecontroller=require('../controllers/expensecontroller');
router.post('/addexpense',expensecontroller.addtoexpense);
router.get('/getexpense',expensecontroller.retriveexpense);
router.delete('/deleteexpense/:id',expensecontroller.deleteexpense);

module.exports=router