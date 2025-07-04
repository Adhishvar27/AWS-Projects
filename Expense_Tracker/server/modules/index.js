const UserTable=require('./userTable');
const ExpenseTable=require('./expenseTable');
const PaymentTable=require('./paymentTable');
const forgetpasswordTable=require('./forgetPasswordTable');
const ContentTable=require('./contentTable');

UserTable.hasMany(ExpenseTable);
ExpenseTable.belongsTo(UserTable);

UserTable.hasMany(forgetpasswordTable,{foreignKey:'userId'});
forgetpasswordTable.belongsTo(UserTable,{foreignKey:'userId'});

UserTable.hasMany(ContentTable,{foreignKey:'userId'});
ContentTable.belongsTo(UserTable,{foreignKey:'userId'});

module.exports={
    UserTable,
    ExpenseTable,
    PaymentTable,
    forgetpasswordTable,
    ContentTable
}