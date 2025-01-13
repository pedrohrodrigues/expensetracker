import { useCallback } from 'react';
import { getIncome } from '../apiRequests/incomeRequests';
import { IncomeActionTypes } from '../stateManagement/actions/incomeActions';
import { useExpensesAppContext } from '../context/context';

export const useFetchIncome = () => {
  const { expensesAppDispatch } = useExpensesAppContext();

  const fetchIncome = useCallback(async () => {
    try {
      const incomes = await getIncome();
      if (incomes !== null) {
        expensesAppDispatch({
          type: IncomeActionTypes.GetIncome,
          payload: incomes,
        });
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  }, [expensesAppDispatch]);

  return fetchIncome;
};
