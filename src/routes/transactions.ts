import express from 'express';
import { addIncome } from '../controllers/income';

const router = express.Router();

router.post('/add-income', addIncome);
export default router;
