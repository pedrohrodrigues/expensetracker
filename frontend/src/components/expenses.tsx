import { useEffect } from 'react';
import { getExpense } from '../apiRequests/expenseRequests';
import { useExpensesAppContext } from '../context/context';
import { ExpenseActionTypes } from '../stateManagement/actions/expenseActions';
import { calculateTotalValue } from '../helpers/incomeHelpers';

export const ListExpensesAppDashboard = () => {
  const { expensesAppState, expensesAppDispatch } = useExpensesAppContext();

  const fetchExpenses = async () => {
    const expenses = await getExpense();
    if (expenses !== null) {
      expensesAppDispatch({
        type: ExpenseActionTypes.GetExpense,
        payload: expenses,
      });
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <div className="w-3/4 bg-slate-50 h-full box-border p-4 rounded-lg border-2">
      <h2 className="text-2xl font-bold">Expenses</h2>

      <div className="rounded-lg border-2 text-center border-box p-2 my-2">
        <h3 className="text-2xl">
          Total Expense:
          <span className="text-red-400" data-testid="total-expense-amount">
            &nbsp;$
            {calculateTotalValue(
              expensesAppState.expenses.map((expense) => expense.amount),
            )}
          </span>
        </h3>
      </div>

      <section data-testid="expensesWrapper" className="w-full lg:w-3/6">
        {expensesAppState.expenses.map((expense, index) => {
          return (
            <div
              key={index}
              className="rounded-lg border-2 border-box p-2 mb-2"
            >
              <div className="flex justify-between">{expense.title}</div>
              <p>Category: {expense.category}</p>
              <span>${expense.amount}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
};
