import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 55,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: 'expense',
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      maxLength: 220,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Expense', ExpenseSchema);
