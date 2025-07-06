const Sib = require('sib-api-v3-sdk');
const path=require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const UserTable = require('../modules/userTable');
const forgetpasswordTable = require('../modules/forgetPasswordTable');
const sequelize = require('../database/database');

const forgetpassword = async (req, res) => {
    const t =await sequelize.transaction();
    try {
        const email = req.body.email;
        const user = await UserTable.findOne({
            where: { email: email }, transaction: t
        });
        if (!user) {
            throw new Error('Enter the correct Email', { status: 'false' });
        }
        const password = await forgetpasswordTable.create({
            userId: user.id
        },{transaction:t});

        const result = sendMail(email, password);
        await t.commit();

        res.status(200).json({result: result,status:'success'});

    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message});
    }

    async function sendMail(email, passwordchange) {
        try {
            const id=passwordchange.id;
            const defaultClient = Sib.ApiClient.instance;
            defaultClient.authentications['api-key'].apiKey = process.env.API_KEY;
            const transEmailApi = new Sib.TransactionalEmailsApi();
            const sender = {
                email: '2016151l@saec.ac.in',
                name: 'Adhishvar'
            }
            const receviers = [
                {
                    email: `${email}`
                }
            ]
            const result = await transEmailApi.sendTransacEmail({
                sender,
                to: receviers,
                subject: `Testing prupose`,
                textContent: `${process.env.BASE_URL}/password/resetpassword/${id}`
            })
            return result;
        } catch (error) {
            return error;
        }

    }
}

const checkifthelinkisactive=async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await forgetpasswordTable.findOne({where:{id:id}});
        if(user.isactive===false){
            return res.status(400).send(`alert('Link has been expried genarate a new One')`);
        }
        res.sendFile(path.join(__dirname,'..','view','resetForm.html'));
    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    forgetpassword,
    checkifthelinkisactive
}





