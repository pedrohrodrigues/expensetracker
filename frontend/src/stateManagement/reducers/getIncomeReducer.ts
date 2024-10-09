import { ExpensesAppStateType } from '../../context/context';
import { getIncomeDto } from '../../types/dtoTypes';

export const getIncomeReducer = (
  state: ExpensesAppStateType,
): ExpensesAppStateType => {
  const testIncomes: getIncomeDto = {
    title: 'Test Income',
    category: 'Category',
    amount: 2,
    description: 'Test Description',
    date: new Date(),
  };
  return {
    ...state,
    incomes: [testIncomes],
  };
};
