const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config.cjs");

const Expense = sequelize.define("Expense", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Other"
    },
    userId: {
        type: DataTypes.UUID,   // must match User id type
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Expense;