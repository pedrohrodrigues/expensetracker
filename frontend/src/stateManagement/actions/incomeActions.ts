export enum IncomeActionTypes {
  ADD_INCOME = 'ADD_INCOME',
  GET_INCOME = 'GET_INCOME',
}

export type IncomeAction = getIncomeAction;

export interface getIncomeAction {
  type: IncomeActionTypes.GET_INCOME;
}

export const getIncome = (): getIncomeAction => {
  return { type: IncomeActionTypes.GET_INCOME };
};
