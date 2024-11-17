import { useEffect, useState } from 'react';
import { useExpensesAppContext } from '../context/context';
import { getIncome } from '../apiRequests/apiRequests';
import { IncomeActionTypes } from '../stateManagement/actions/incomeActions';
import { calculateTotalIncomesValue } from '../helpers/incomeHelpers';
import { AddIncomesAppDashboard } from './addIncome';

export const ListIncomesAppDashboard = () => {
  const [refeshList, setRefreshList] = useState(false);
  const { expensesAppState, expensesAppDispatch } = useExpensesAppContext();

  const handleRefreshList = () => {
    setRefreshList(!refeshList);
  };
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
  }, [refeshList]);
  return (
    <div className="w-3/4 bg-slate-50 h-full box-border p-4 rounded-lg border-2 ">
      <h2 className="text-2xl font-bold">Incomes</h2>

      <div className="rounded-lg border-2 text-center border-box p-2 my-2">
        <h3 className="text-2xl">
          Total income:
          <span className="text-green-400" data-testid="total-incomes-amount">
            &nbsp;$
            {calculateTotalIncomesValue(
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
          {expensesAppState.incomes.map((income, index) => {
            return (
              <div
                key={index}
                className="rounded-lg border-2 border-box p-2 mb-2"
              >
                {income.title}
                <p>Category: {income.category}</p>
                <span>${income.amount}</span>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
