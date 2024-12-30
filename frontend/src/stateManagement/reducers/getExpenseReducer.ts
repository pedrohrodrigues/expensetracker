import { ExpensesAppStateType } from '../../context/context';
import { getExpenseAction } from '../actions/expenseActions';

export const getExpenseReducer = (
  state: ExpensesAppStateType,
  action: getExpenseAction,
): ExpensesAppStateType => {
  const expenses = action.payload;
  return {
    ...state,
    expenses,
  };
};
