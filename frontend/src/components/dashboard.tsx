import { useEffect } from 'react';
import { useExpensesAppContext } from '../context/context';
import { IncomeActionTypes } from '../stateManagement/actions/incomeActions';

export const DashboardAppDashboard = () => {
  const { expensesAppDispatch, expensesAppState } = useExpensesAppContext();
  useEffect(() => {
    expensesAppDispatch({ type: IncomeActionTypes.GET_INCOME });
  }, []);
  return (
    <div className="w-3/4 bg-white h-full box-border p-4 rounded-lg border-2">
      <h2>Dashboard</h2>

      <p>{expensesAppState.incomes.length}</p>
    </div>
  );
};
