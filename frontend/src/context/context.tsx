import React, { createContext, useReducer } from 'react';
import { getIncomeDto } from '../types/dtoTypes';
import {
  IncomeAction,
  IncomeActionTypes,
} from '../stateManagement/actions/incomeActions';
import { getIncomeReducer } from '../stateManagement/reducers/getIncomeReducer';

interface ExpensesAppProviderProps {
  children: React.ReactNode;
}
interface ExpensesAppContextType {
  expensesAppState: ExpensesAppStateType;
  expensesAppDispatch: React.Dispatch<IncomeAction>;
}
const ExpensesAppContext = createContext<ExpensesAppContextType | undefined>(
  undefined,
);

export interface ExpensesAppStateType {
  incomes: getIncomeDto[];
}

export const ExpensesAppProvider = ({ children }: ExpensesAppProviderProps) => {
  const initialState = {
    incomes: [],
  };

  function reducer(state: ExpensesAppStateType, action: IncomeAction) {
    switch (action.type) {
      case IncomeActionTypes.GET_INCOME:
        return getIncomeReducer(state);
      default:
        return state;
    }
  }

  const [expensesAppState, expensesAppDispatch] = useReducer(
    reducer,
    initialState,
  );

  const value = {
    expensesAppState,
    expensesAppDispatch,
  };

  return (
    <ExpensesAppContext.Provider value={value}>
      {children}
    </ExpensesAppContext.Provider>
  );
};

export const useExpensesAppContext = () => {
  const context = React.useContext(ExpensesAppContext);
  if (context === undefined) {
    throw new Error(
      'useExpensesAppContext must be used within a ExpensesAppProvider',
    );
  }
  return context;
};
