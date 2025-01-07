import { useEffect, useState } from 'react';
import { deleteExpense, getExpense } from '../apiRequests/expenseRequests';
import { useExpensesAppContext } from '../context/context';
import { ExpenseActionTypes } from '../stateManagement/actions/expenseActions';
import { calculateTotalValue } from '../helpers/incomeHelpers';
import { AddExpensesAppDashboard } from './addExpense';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface onSubmitMessageProps {
  message: string;
  color: string;
}

export const ListExpensesAppDashboard = () => {
  const { expensesAppState, expensesAppDispatch } = useExpensesAppContext();
  const [refeshList, setRefreshList] = useState(false);
  const [promiseMessage, setPromiseMessage] = useState<onSubmitMessageProps>({
    message: '',
    color: '',
  });

  const handleRefreshList = () => {
    setRefreshList(!refeshList);
  };

  const handleDeleteExpense = async (expenseId: string) => {
    const result = await deleteExpense(expenseId);
    if (result == 200) {
      setPromiseMessage({
        message: 'Expense successfully deleted',
        color: 'green',
      });
      setRefreshList(!refeshList);
    } else {
      setPromiseMessage({
        message: 'Error trying to delete expense, please try again',
        color: 'red',
      });
    }
  };

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
  }, [refeshList]);
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
      <div className="flex justify-between w-full flex-wrap">
        <section className="w-full lg:w-2/6">
          <AddExpensesAppDashboard refreshList={handleRefreshList} />
        </section>
        <section data-testid="expensesWrapper" className="w-full lg:w-3/6">
          {promiseMessage.message.length > 0 && (
            <div
              className="w-full mb-2"
              data-testid="return-promise-message"
              style={{ color: promiseMessage.color }}
            >
              {promiseMessage.message}
            </div>
          )}
          {expensesAppState.expenses.map((expense, index) => {
            return (
              <div
                key={index}
                className="rounded-lg border-2 border-box p-2 mb-2"
              >
                <div className="flex justify-between">
                  {expense.title}
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    data-testid={`delete-expense-${expense._id}`}
                    icon={faTrash}
                    onClick={() => handleDeleteExpense(expense._id)}
                  />
                </div>

                <p>Category: {expense.category}</p>
                <span>${expense.amount}</span>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
