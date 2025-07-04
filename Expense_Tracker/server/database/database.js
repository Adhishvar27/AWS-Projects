const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATA_BASE, process.env.USER_NAME, process.env.PASSWORD, {
    dialect: process.env.DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    logging: (msg) => {
        // Only print actual SQL queries
        if (msg.startsWith('Executing (default):')) {
            console.log(msg);
        }
    }
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('conection made successfully');
    } catch (error) {
        console.log(error);
    }
})();

module.exports = sequelize;