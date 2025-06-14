import React, { useState } from 'react';
import { ExpensesAppHeader } from './components/header';
import { ExpensesAppLeftSidebar } from './components/leftSidebar';
import { DashboardAppDashboard } from './components/dashboard';
import { IncomesAppDashboard } from './components/incomes';
import { TransactionsAppDashboard } from './components/transactions';
import { ListExpensesAppDashboard } from './components/expenses';

function App() {
  const [activePath, setActivePath] = useState(0);
  const displayMainContent = () => {
    switch (activePath) {
      case 0:
        return <DashboardAppDashboard />;
      case 1:
        return <TransactionsAppDashboard />;
      case 2:
        return <IncomesAppDashboard />;
      case 3:
        return <ListExpensesAppDashboard />;
      default:
        return <DashboardAppDashboard />;
    }
  };
  return (
    <div className="place-content-center w-full flex lg:min-h-[660px] ">
      <main className="flex flex-wrap lg:justify-between h-full w-full justify-center">
        <ExpensesAppHeader />
        <section className="flex justify-start w-full gap-20">
          <ExpensesAppLeftSidebar
            activePath={activePath}
            setActivePath={setActivePath}
          />
          <div className="mt-6 w-[70%]">{displayMainContent()}</div>
        </section>
      </main>
    </div>
  );
}

export default App;
