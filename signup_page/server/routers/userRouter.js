const express=require('express');
const router=express.Router();

router.post('/signup',(req,res)=>{
    const { name, email, password } = req.body;
    console.log(name, email, password);
});

module.exports=router;
