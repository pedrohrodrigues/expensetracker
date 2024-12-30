import { getExpenseDto } from '../../types/dtoTypes';

export enum ExpenseActionTypes {
  GetExpense = 'GET_EXPENSE',
}

export type ExpenseAction = getExpenseAction;

export interface getExpenseAction {
  type: ExpenseActionTypes.GetExpense;
  payload: getExpenseDto[];
}

export const listExpenseAction = (
  expenses: getExpenseDto[],
): getExpenseAction => {
  return {
    type: ExpenseActionTypes.GetExpense,
    payload: expenses,
  };
};
