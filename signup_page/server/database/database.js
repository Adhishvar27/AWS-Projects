const {Sequelize}=require('sequelize');

const sequelize= new Sequelize('expense_tacker_app_aws','root','root',{
    dialect:'mysql',
    host:'localhost'
});


(async ()=>{try {
    await sequelize.authenticate();
    console.log('conection made successfully');
} catch (error) {
    console.log(error);
}})();

module.exports=sequelize;
