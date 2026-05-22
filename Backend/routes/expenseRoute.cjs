
const express = require("express");
const expenseRouter = express.Router();

const {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getTotalExpense
} = require("../controllers/expenseController.cjs");

const authMiddleware = require("../middleware/authenticationMiddleware.cjs");

/**
 * ADD EXPENSE
 */
expenseRouter.post("/expenses", authMiddleware, addExpense);

/**
 * GET ALL EXPENSES
 */
expenseRouter.get("/expenses", authMiddleware, getExpenses);

/**
 * UPDATE EXPENSE
 */
expenseRouter.put("/expenses/:id", authMiddleware, updateExpense);

/**
 * DELETE EXPENSE
 */
expenseRouter.delete("/expenses/:id", authMiddleware, deleteExpense);

/**
 * GET TOTAL EXPENSE
 */
expenseRouter.get("/expenses/total", authMiddleware, getTotalExpense);


module.exports=expenseRouter;