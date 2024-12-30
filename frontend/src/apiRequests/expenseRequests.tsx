import axios from 'axios';
import { getExpenseDto } from '../types/dtoTypes';
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
