const UserTable=require('../modules/userTable');
const DataBase=require('../database/database');
const bcyrpt=require('bcrypt');

const addtousers=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existinguser=await UserTable.findOne({where:{email:email}});
        if(existinguser){
            return res.status(400).json({message:'User already exist'});
        } 
        const saltround=10;
        bcyrpt.hash(password,saltround,async (err,hash)=>{
            console.log(err);
            await UserTable.create({ name , email , password: hash });
        res.status(201).json({message:'User inserted successfully'});
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const checklogin=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await UserTable.findOne({where:{email:email}});
        if(!user){
            return res.status(404).json({message:'User Not Found',status:404});
        }
        bcyrpt.compare(password,user.password,(err,result)=>{
            if(err){
                throw new Error('Somthing went wrong');
            }
            if(result===true){
                 return res.status(200).json({user,message:'login successful',status:200});
            }
            else{
                 return res.status(400).json({message:'Password is incorrect',status:400});
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message,status:500});
    }
}

module.exports={
    addtousers,
    checklogin
};