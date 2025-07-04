const express=require('express');
const router=express.Router();

const passwordcontroller=require('../controllers/passwordcontroller');
router.post('/forgetpassword',passwordcontroller.forgetpassword);
router.get('/resetpassword/:id',passwordcontroller.checkifthelinkisactive);

const resetpasscontroller=require('../controllers/resetpasscontroller');
router.post('/passwordchange',resetpasscontroller.resetpassword);


module.exports=router