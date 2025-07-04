const express=require('express');
const router=express.Router();

const userauth=require('../middleware/userauth');
const expensecontroller=require('../controllers/expensecontroller');

router.post('/addexpense',userauth.authenticateUser,expensecontroller.addtoexpense);
router.get('/getexpense',userauth.authenticateUser,expensecontroller.retriveexpense);
router.delete('/deleteexpense',userauth.authenticateUser,expensecontroller.deleteexpense);

router.get('/downloadreport',userauth.authenticateUser,expensecontroller.downloadexpense);
router.get('/showreportlist',userauth.authenticateUser,expensecontroller.downloadedlist)

module.exports=router