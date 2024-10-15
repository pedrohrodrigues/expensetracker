import { ExpensesAppStateType } from '../../context/context';
import { getIncomeAction } from '../actions/incomeActions';

export const getIncomeReducer = (
  state: ExpensesAppStateType,
  action: getIncomeAction,
): ExpensesAppStateType => {
  const incomes = action.payload;
  return {
    ...state,
    incomes: incomes,
  };
};
