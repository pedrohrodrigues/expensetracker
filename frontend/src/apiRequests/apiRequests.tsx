import { addIncomeDto, getIncomeDto } from '../types/dtoTypes';
import axios from 'axios';
const BASE_URL = 'http://localhost:5001/api/v1/';

export const addIncome = async (income: addIncomeDto) => {
  return await axios.post(`${BASE_URL}add-income`, income).catch(() => {
    console.log('Error adding incomes');
  });
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
