const UserTable = require('../modules/userTable');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../database/database');
const serectKey = process.env.JWT_Code;

const addtousers = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const { name, email, password } = req.body;
        const existinguser = await UserTable.findOne({ where: { email: email } });
        if (existinguser) {
            return res.status(400).json({ message: 'User already exist' });
        }
        const saltround = 10;
        bcyrpt.hash(password, saltround, async (err, hash) => {
            if(err){
            console.log(err);
            }
            await UserTable.create({ name, email, password: hash, premium: false }, { transaction });
            await transaction.commit();
            res.status(201).json({ message: 'User inserted successfully' });
        })
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
}

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, Username: name }, serectKey);
}

const checklogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserTable.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: 'User Not Found', status: 404 });
        }
        bcyrpt.compare(password, user.password, (err, result) => {
            if (err) {
                throw new Error('Somthing went wrong');
            }
            if (result === true) {
                return res.status(200).json({ user, message: 'login successful', status: 200, token: generateAccessToken(user.id, user.name) });
            }
            else {
                return res.status(400).json({ message: 'Password is incorrect', status: 400 });
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message, status: 500 });
    }
}

module.exports = {
    addtousers,
    checklogin
};