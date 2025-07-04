const express=require('express');
const router=express.Router();

const premiumcontroller=require('../controllers/premiumcontroller');
router.get('/getleaderboard',premiumcontroller.getpremium);

module.exports=router;