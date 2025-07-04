const express=require('express');
const router=express.Router();

const usercontroller=require('../controllers/usercontroller');

router.post('/signup',usercontroller.addtousers);
router.post('/login',usercontroller.checklogin);

module.exports=router;