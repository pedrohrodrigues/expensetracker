import express from 'express';
import { addIncome, deleteIncome, getIncome } from '../controllers/income';
import { addExpense, deleteExpense, getExpense } from '../controllers/expense';

const router = express.Router();

router.post('/add-income', addIncome);

router.get('/get-income', getIncome);

router.delete('/delete-income/:id', deleteIncome);

router.post('/add-expense', addExpense);

router.get('/get-expense', getExpense);

router.delete('/delete-expense/:id', deleteExpense);

export default router;
