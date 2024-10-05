import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faChartLine,
  faCreditCard,
  faMoneyBillTrendUp,
  faMoneyBillTransfer,
} from '@fortawesome/free-solid-svg-icons';

export const ExpensesAppLeftSidebar = () => {
  return (
    <aside className="rounded-lg border-2 border-white h-full bg-white lg:w-1/5 box-border p-4 w-3/4 mb-6 lg:mb-0">
      <div className="flex align-items-center h-20">
        <div className="flex place-content-center items-center align-items-center h-full w-20 h-20 border-mainBackground rounded-full border-2 mr-5">
          <FontAwesomeIcon icon={faUserTie} className="text-4xl" />
        </div>
        <div className="h-full">
          <h3 className="w-full h-1/4 my-2 cursor-pointer">Me</h3>
          <p className="w-full h-1/4 cursor-pointer">My Money</p>
        </div>
      </div>
      <ul className="mt-4">
        <li className="my-1 cursor-pointer">
          <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Dashboard
        </li>
        <li className="my-1 cursor-pointer">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2" /> View
          Transactions
        </li>
        <li className="my-1 cursor-pointer">
          <FontAwesomeIcon icon={faMoneyBillTrendUp} className="mr-2" /> Incomes
        </li>
        <li className="my-1 cursor-pointer">
          <FontAwesomeIcon icon={faMoneyBillTransfer} className="mr-2" />
          Expenses
        </li>
      </ul>
    </aside>
  );
};
