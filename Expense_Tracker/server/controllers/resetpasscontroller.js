const sequelize = require('../database/database');
const UserTable=require('../modules/userTable');
const restpasswordTable=require('../modules/forgetPasswordTable');
const bcyrpt=require('bcrypt');
const resetpassword=async(req,res)=>{
    const t=await sequelize.transaction();
    try {
        const email=req.body.email;
        const newpassword=req.body.password;
        const user=await UserTable.findOne({where:{email:email},transaction:t});
        if(!user){
            throw new Error('User Not Found Enter the correct  Email');
        }
        const saltround=10
        bcyrpt.hash(newpassword,saltround,async(err,hash)=>{
            if(err){
                console.log(err);
            }
            await UserTable.update({password:hash},{where:{id:user.id}},{transaction:t});
            await restpasswordTable.update({isactive:false},{where:{userId:user.id}});
            await t.commit();       
            res.status(200).json({message:'Password reset successfully'});
        })
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports={
    resetpassword
}