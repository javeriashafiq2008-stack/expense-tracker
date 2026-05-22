const User=require("../Model/userModel.cjs");
const Expense=require("../Model/expenseModel.cjs");


USER.hasMany(Expense,{foreignKey:"userid"});
Expense.belongsTo(User,{forigenkey:"userid"});

module.exports={User,Expense};