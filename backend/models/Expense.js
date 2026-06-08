const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Përshkrimi është i detyrueshëm'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Shuma është e detyrueshme'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Kategoria është e detyrueshme'],
      trim: true,
      enum: ['Ushqim', 'Transport', 'Fatura', 'Argëtim', 'Tjetër'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
