import { useEffect, useState } from 'react';
import { useExpensesAppContext } from '../context/context';
import { deleteIncome } from '../apiRequests/incomeRequests';
import {
  calculateTotalValue,
  getItemsForTheCurrentPage,
  handleAmountOfPages,
} from '../helpers/generalHelpers';
import { AddIncomesAppDashboard, onSubmitMessageProps } from './addIncome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useFetchIncome } from '../hooks/useFetchIncome';

export const IncomesAppDashboard = () => {
  const totalItemsPerPage = 10;
  const [refreshList, setRefreshList] = useState(false);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [promiseMessage, setPromiseMessage] = useState<onSubmitMessageProps>({
    message: '',
    color: '',
  });

  const { expensesAppState } = useExpensesAppContext();
  const fetchIncome = useFetchIncome();

  const handleRefreshList = () => {
    setRefreshList(!refreshList);
  };

  const handleDeleteIncome = async (incomeId: string) => {
    const result = await deleteIncome(incomeId);
    if (result === 200) {
      setPromiseMessage({
        message: 'Income successfully deleted',
        color: 'green',
      });
      setRefreshList(!refreshList);
    } else {
      setPromiseMessage({
        message: 'Error trying to delete income, please try again',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    fetchIncome();
    setPages(
      handleAmountOfPages(expensesAppState.incomes.length, totalItemsPerPage),
    );
  }, [fetchIncome, refreshList]);

  return (
    <div className="w-3/4 bg-slate-50 h-[80%] box-border p-4 rounded-lg border-2">
      <h2 className="text-2xl font-bold">Incomes</h2>
      <div className="rounded-lg border-2 text-center border-box p-2 my-2">
        <h3 className="text-2xl">
          Total income:
          <span className="text-green-400" data-testid="total-incomes-amount">
            &nbsp;$
            {calculateTotalValue(
              expensesAppState.incomes.map((income) => income.amount),
            )}
          </span>
        </h3>
      </div>
      <div className="flex justify-between w-full flex-wrap">
        <section className="w-full lg:w-2/6">
          <AddIncomesAppDashboard refreshList={handleRefreshList} />
        </section>
        <section data-testid="incomesWrapper" className="w-full lg:w-3/6">
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
            expensesAppState.incomes,
          ).map((income, index) => {
            return (
              <div
                key={index}
                className="rounded-lg border-2 border-box p-2 mb-2"
              >
                <div className="flex justify-between">
                  {income.title}
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    data-testid={`delete-income-${income._id}`}
                    icon={faTrash}
                    onClick={() => handleDeleteIncome(income._id)}
                  />
                </div>
                <p>Category: {income.category}</p>
                <span>${income.amount}</span>
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
