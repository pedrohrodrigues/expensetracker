import { Request, Response } from 'express';
import IncomeSchema from '../models/incomeModel';
export interface addIncomeDto {
  title: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export const addIncome = async (req: Request<addIncomeDto>, res: Response) => {
  const { title, amount, description, date, category } = req.body;

  if (!title || !amount || !description || !date || !category) {
    res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
    return;
  }

  try {
    const income = await IncomeSchema.create({
      title,
      category,
      description,
      amount,
      date,
    });

    await income.save();

    res.status(200).json({
      success: true,
      message: 'Income has been added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getIncome = async (req: Request, res: Response) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const income = await IncomeSchema.findByIdAndDelete(id);

    if (!income) {
      res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json({ message: 'Income Deleted' });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'Server Error' });
  }
};
