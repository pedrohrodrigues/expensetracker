import { getIncomeDto } from '../../types/dtoTypes';

export enum IncomeActionTypes {
  AddIncome = 'ADD_INCOME',
  GetIncome = 'GET_INCOME',
}

export type IncomeAction = getIncomeAction;

export interface getIncomeAction {
  type: IncomeActionTypes.GetIncome;
  payload: getIncomeDto[];
}

export const getIncome = (incomes: getIncomeDto[]): getIncomeAction => {
  return { type: IncomeActionTypes.GetIncome, payload: incomes };
};
