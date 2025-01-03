import { addIncomeOrExpenseDto, getIncomeDto } from '../types/dtoTypes';
import axios from 'axios';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const addIncome = async (
  income: addIncomeOrExpenseDto,
): Promise<number | undefined> => {
  try {
    const result = await axios.post(`${BASE_URL}add-income`, income);
    return result.status;
  } catch (error) {
    console.log('Error adding incomes:', error);
  }
};

export const getIncome = async (): Promise<getIncomeDto[] | null> => {
  try {
    const result = await axios.get<getIncomeDto[]>(`${BASE_URL}get-income`);
    return result.data;
  } catch (error) {
    console.log('Error getting incomes:', error);
    return null;
  }
};

export const deleteIncome = async (
  incomeId: string,
): Promise<number | null> => {
  try {
    const result = await axios.delete(`${BASE_URL}delete-income/${incomeId}`);
    return result.status;
  } catch (error) {
    console.log('Error deleting incomes:', error);
    return null;
  }
};
