import './../assets/css/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faChartLine,
  faCreditCard,
  faMoneyBillTrendUp,
  faMoneyBillTransfer,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  name: string;
  icon: IconDefinition;
  link: string;
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: faChartLine,
    link: '/dashboard',
  },
  {
    name: 'Transactions',
    icon: faCreditCard,
    link: '/transactions',
  },
  {
    name: 'Incomes',
    icon: faMoneyBillTrendUp,
    link: '/incomes',
  },
  {
    name: 'Expenses',
    icon: faMoneyBillTransfer,
    link: '/expenses',
  },
];

interface expensesAppLeftSidebarProps {
  activePath: number;
  setActivePath: (index: number) => void;
}

export const ExpensesAppLeftSidebar = (props: expensesAppLeftSidebarProps) => {
  return (
    <aside className="border-2 min-h-screen bg-sidebar lg:w-[10%] box-border p-4 w-3/4 mb-6 lg:mb-0 relative z-0">
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
        {menuItems.map((item, index) => (
          <li
            className={`my-1 cursor-pointer ${props.activePath === index ? 'active-path' : ''}`}
            key={index}
            onClick={() => props.setActivePath(index)}
          >
            <FontAwesomeIcon icon={item.icon} className="mr-2" /> {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
