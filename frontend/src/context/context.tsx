import React, { createContext, useReducer } from 'react';
import { getExpenseDto, getIncomeDto } from '../types/dtoTypes';
import {
  IncomeAction,
  IncomeActionTypes,
} from '../stateManagement/actions/incomeActions';
import { getIncomeReducer } from '../stateManagement/reducers/getIncomeReducer';
import {
  ExpenseAction,
  ExpensesActionTypes,
} from '../stateManagement/actions/expensesActions';

interface ExpensesAppProviderProps {
  children: React.ReactNode;
}
interface ExpensesAppContextType {
  expensesAppState: ExpensesAppStateType;
  expensesAppDispatch: React.Dispatch<IncomeAction>;
}

type ExpensesAppContextActionType = IncomeAction | ExpenseAction;

const ExpensesAppContext = createContext<ExpensesAppContextType | undefined>(
  undefined,
);

export interface ExpensesAppStateType {
  incomes: getIncomeDto[];
  expenses: getExpenseDto[];
}

export const ExpensesAppProvider = ({ children }: ExpensesAppProviderProps) => {
  const initialState = {
    incomes: [],
    expenses: [],
  };

  function reducer(
    state: ExpensesAppStateType,
    action: ExpensesAppContextActionType,
  ) {
    switch (action.type) {
      case IncomeActionTypes.GetIncome:
        return getIncomeReducer(state, action);
      case ExpensesActionTypes.ListExpenses:
        return state;
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
