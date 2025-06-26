const UserTable=require('../modules/userTable');
const ExpenseTable=require('../modules/expenseTable');

UserTable.hasMany(ExpenseTable);
ExpenseTable.belongsTo(UserTable);

module.exports={
    UserTable,
    ExpenseTable
}