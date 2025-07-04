const UserTable = require('../modules/userTable');
const jwt = require('jsonwebtoken');
const serectKey = process.env.JWT_Code;

async function authenticateUser(req, res, next) {
    try {
        const token = req.header('Authorization');
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token missing or malformed' });
        }
        const actualtoken = token.split(' ')[1];
        const usertoFind = jwt.verify(actualtoken, serectKey);
        await UserTable.findByPk(usertoFind.userId).then(user => {
            req.user = user;
            next();
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
}

module.exports = { authenticateUser };