import { useEffect } from 'react';
import { useExpensesAppContext } from '../context/context';
import { calculateTotalValue } from '../helpers/generalHelpers';
import { useFetchIncome } from '../hooks/useFetchIncome';
import { useFetchExpense } from '../hooks/useFetchExpense';

export const DashboardAppDashboard = () => {
  const { expensesAppState } = useExpensesAppContext();
  const fetchIncome = useFetchIncome();
  const fetchExpense = useFetchExpense();

  const getTotalBalance = () => {
    const totalIncome = calculateTotalValue(
      expensesAppState.incomes.map((income) => income.amount),
    );
    const totalExpense = calculateTotalValue(
      expensesAppState.expenses.map((expense) => expense.amount),
    );

    if (totalIncome > totalExpense) {
      return totalIncome - totalExpense;
    }
    return totalExpense - totalIncome;
  };

  useEffect(() => {
    fetchIncome();
    fetchExpense();
  }, [fetchIncome, fetchExpense]);

  return (
    <div className="w-3/4 bg-slate-50 h-full box-border p-4 rounded-lg border-2">
      <h2>Dashboard</h2>
      <div className="rounded-lg border-2 text-center border-box p-2 my-2">
        <h3 className="text-2xl">
          Total Balance:
          <span className="text-green-400" data-testid="total-balance-amount">
            &nbsp;$
            {getTotalBalance()}
          </span>
        </h3>
      </div>
    </div>
  );
};
