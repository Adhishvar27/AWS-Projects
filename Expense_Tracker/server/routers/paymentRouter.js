const express=require('express');
const router=express.Router();

const {authenticateUser}=require('../middleware/userauth');
const paymentcontroller=require('../controllers/paymentcontroller');

router.post('/cashless',authenticateUser,paymentcontroller.paymentprocess);
router.get('/premium',authenticateUser,paymentcontroller.premiumcheck)
router.get('/status',paymentcontroller.renderpaymentForm);

module.exports=router;