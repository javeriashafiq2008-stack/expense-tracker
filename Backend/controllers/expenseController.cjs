const Expense = require("../model/expenseModel.cjs");

const addExpense = async (req, res) => {
    try {
        const { title, amount } = req.body;

        if (!title || !amount) {
            return res.status(400).json({
                message: "Title and amount are required"
            });
        }

        if (isNaN(amount)) {
            return res.status(400).json({
                message: "Amount must be a valid number"
            });
        }

        const createdExpense = await Expense.create({
            title: title.trim(),
            amount: Number(amount),
            userId: req.userId
        });

        return res.status(201).json({
            message: "Expense added successfully",
            data: createdExpense
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: { userId: req.userId }
        });

        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        return res.json({
            data: expenses
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await expense.destroy();

        return res.json({
            message: "Expense deleted"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const updateExpense = async (req, res) => {
    try {
        const { title, amount } = req.body;

        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        expense.title = title ?? expense.title;
        expense.amount = amount !== undefined ? Number(amount) : expense.amount;

        await expense.save();

        return res.json({
            message: "Expense updated",
            data: expense
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getTotalExpense = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: { userId: req.userId }
        });

        const total = expenses.reduce((sum, e) => sum + e.amount, 0);

        return res.json({
            total
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getTotalExpense
};