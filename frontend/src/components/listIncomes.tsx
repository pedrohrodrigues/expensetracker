import { useEffect } from 'react';
import { useExpensesAppContext } from '../context/context';
import { getIncome } from '../apiRequests/apiRequests';
import { IncomeActionTypes } from '../stateManagement/actions/incomeActions';
import { calculateTotalIncomesValue } from '../helpers';

export const ListIncomesAppDashboard = () => {
  const { expensesAppState, expensesAppDispatch } = useExpensesAppContext();
  const fetchIncome = async () => {
    const incomes = await getIncome();
    if (incomes !== null) {
      expensesAppDispatch({
        type: IncomeActionTypes.GetIncome,
        payload: incomes,
      });
    }
  };
  useEffect(() => {
    fetchIncome();
  }, []);
  return (
    <div className="w-3/4 bg-white h-full box-border p-4 rounded-lg border-2">
      <h2 className="text-2xl font-bold">Incomes</h2>

      <p>
        Total income: $
        {calculateTotalIncomesValue(
          expensesAppState.incomes.map((income) => income.amount),
        )}
      </p>

      {expensesAppState.incomes.map((income, index) => {
        return (
          <div key={index}>
            <p>Title: {income.title}</p>
            <p>Category: {income.category}</p>
          </div>
        );
      })}
    </div>
  );
};
