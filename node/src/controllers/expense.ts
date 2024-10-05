import { Request, Response } from 'express';
import ExpenseSchema from '../models/expenseModel';
export interface addExpenseDto {
  title: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export const addExpense = async (req: Request<addExpenseDto>, res: Response) => {
  const { title, amount, description, date, category } = req.body;

  if (!title || !amount || !description || !date || !category) {
    res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
    return;
  }

  try {
    const expense = await ExpenseSchema.create({
      title,
      category,
      description,
      amount,
      date,
    });

    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Expense has been added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const expense = await ExpenseSchema.find().sort({ createAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense = await ExpenseSchema.findByIdAndDelete(id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense Deleted' });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'Server Error' });
  }
};
