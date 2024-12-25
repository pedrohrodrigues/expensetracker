import { getExpenseDto } from '../../types/dtoTypes';

export enum ExpensesActionTypes {
  ListExpenses = 'LIST_EXPENSES',
}

export type ExpenseAction = getExpenseAction;

export interface getExpenseAction {
  type: ExpensesActionTypes.ListExpenses;
  payload: getExpenseDto[];
}

export const listExpensesAction = (
  expenses: getExpenseDto[],
): getExpenseAction => {
  return {
    type: ExpensesActionTypes.ListExpenses,
    payload: expenses,
  };
};
