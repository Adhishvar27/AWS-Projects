const UserTable=require('../modules/userTable');
const DataBase=require('../database/database');

const addtousers=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const insertintouser=UserTable.create({
            name:name,
            email:email,
            password:password
        });
        res.status(201).json(insertintouser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const checklogin=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await UserTable.findOne({where:{email:email}});
        if(!user){
            return res.status(404).json({message:'User Not Found'});
        }
        if(user.password!==password){
            return res.status(400).json({message:'Password is incorrect'});
        }
        res.status(200).json({user,message:'login successful'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports={
    addtousers,
    checklogin
};