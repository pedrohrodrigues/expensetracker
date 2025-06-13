import { useEffect, useState } from 'react';
import { deleteExpense } from '../apiRequests/expenseRequests';
import { useExpensesAppContext } from '../context/context';
import {
  calculateTotalValue,
  getItemsForTheCurrentPage,
  handleAmountOfPages,
} from '../helpers/generalHelpers';
import { AddExpensesAppDashboard } from './addExpense';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useFetchExpense } from '../hooks/useFetchExpense';

interface onSubmitMessageProps {
  message: string;
  color: string;
}

export const ListExpensesAppDashboard = () => {
  const totalItemsPerPage = 10;
  const { expensesAppState } = useExpensesAppContext();
  const [refeshList, setRefreshList] = useState(false);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [promiseMessage, setPromiseMessage] = useState<onSubmitMessageProps>({
    message: '',
    color: '',
  });
  const fetchExpense = useFetchExpense();
  const expenses = expensesAppState.expenses;
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

  useEffect(() => {
    fetchExpense();
    setPages(
      handleAmountOfPages(expensesAppState.incomes.length, totalItemsPerPage),
    );
  }, [fetchExpense, refeshList]);
  return (
    <div className="w-3/4 bg-slate-50 h-[80%] box-border p-4 rounded-lg border-2">
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
          {getItemsForTheCurrentPage(
            currentPage,
            totalItemsPerPage,
            expenses,
          ).map((expense, index) => {
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
          <section className="flex justify-start w-full">
            {pages > 1 &&
              Array.from({ length: pages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
                  } border-2 border-box p-2 rounded-lg m-1`}
                  onClick={() => {
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              ))}
          </section>
        </section>
      </div>
    </div>
  );
};
