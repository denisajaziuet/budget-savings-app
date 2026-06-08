const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
  const { description, amount, category, date } = req.body;

  if (!description || amount === undefined || !category) {
    res.status(400);
    throw new Error('Ju lutem plotësoni të gjitha fushat e shpenzimit');
  }

  const expense = await Expense.create({
    description,
    amount,
    category,
    date,
    user: req.user.id,
  });

  res.status(201).json(expense);
});

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Shpenzimi nuk u gjet');
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Nuk jeni i autorizuar');
  }

  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updated);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Shpenzimi nuk u gjet');
  }

  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Nuk jeni i autorizuar');
  }

  await Expense.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Shpenzimi ${req.params.id} u fshi` });
});

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
