import axios from 'axios';
import { addIncomeOrExpenseDto, getExpenseDto } from '../types/dtoTypes';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getExpense = async (): Promise<getExpenseDto[] | null> => {
  try {
    const result = await axios.get<getExpenseDto[]>(`${BASE_URL}get-expense`);
    return result.data;
  } catch (error) {
    console.log('Error getting expenses:', error);
    return null;
  }
};

export const addExpense = async (
  expense: addIncomeOrExpenseDto,
): Promise<number | undefined> => {
  try {
    const result = await axios.post(`${BASE_URL}add-expense`, expense);
    return result.status;
  } catch (error) {
    console.log('Error adding expenses:', error);
  }
};

export const deleteExpense = async (
  expenseId: string,
): Promise<number | null> => {
  try {
    const result = await axios.delete(`${BASE_URL}delete-expense/${expenseId}`);
    return result.status;
  } catch (error) {
    console.log('Error deleting expenses:', error);
    return null;
  }
};
