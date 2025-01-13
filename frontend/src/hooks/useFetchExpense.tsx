import { useCallback } from 'react';
import { useExpensesAppContext } from '../context/context';
import { getExpense } from '../apiRequests/expenseRequests';
import { ExpenseActionTypes } from '../stateManagement/actions/expenseActions';

export const useFetchExpense = () => {
  const { expensesAppDispatch } = useExpensesAppContext();

  const fetchExpense = useCallback(async () => {
    try {
      const expense = await getExpense();
      if (expense !== null) {
        expensesAppDispatch({
          type: ExpenseActionTypes.GetExpense,
          payload: expense,
        });
      }
    } catch (error) {
      console.error('Error fetching expense:', error);
    }
  }, [expensesAppDispatch]);

  return fetchExpense;
};
