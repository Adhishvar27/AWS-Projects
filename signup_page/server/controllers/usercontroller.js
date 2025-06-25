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

module.exports={
    addtousers
};
