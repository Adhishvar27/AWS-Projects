const UserTable = require('../modules/userTable');
const getpremium = async (req, res) => {
    try {
        const LeaderBoard = await UserTable.findAll({
            attributes: ['id', 'name', 'totalamount'],
            order: [['totalamount', 'DESC']],
            limit:10
        });

        const formatteddata = LeaderBoard.map(entry => ({
            id: entry.dataValues.id,
            name: entry.dataValues.name,
            totalAmount: entry.dataValues.totalamount
        }))
        console.log(formatteddata);
        res.status(200).json(formatteddata);

        // const getleaderboard=await ExpenseTable.findAll({
        //     attributes:[
        //         'userId',
        //         [sequelize.fn('SUM',sequelize.col('amount')),'totalAmount']
        //     ],
        //     group:['userId'], //'group:['userId','UserTable.id']' this not used in mySql but in other databases juse for pratice
        //     order:[[sequelize.fn('SUM',sequelize.col('amount')),'DESC']],
        //     include:{
        //         model:UserTable,
        //         attributes:['name']
        //     }
        // });
        // const formatteddata=getleaderboard.map(entry=>({
        //         id:entry.userId,
        //         name:entry.user.name,
        //         totalAmount:entry.get('totalAmount')
        //     }));
        // res.status(200).json(formatteddata);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    getpremium
}