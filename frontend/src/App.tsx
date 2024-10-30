import React, { useState } from 'react';
import { ExpensesAppHeader } from './components/header';
import { ExpensesAppLeftSidebar } from './components/leftSidebar';
import { DashboardAppDashboard } from './components/dashboard';
import { ListIncomesAppDashboard } from './components/listIncomes';
import { TransactionsAppDashboard } from './components/transactions';
import { ExpensesAppDashboard } from './components/expenses';

function App() {
  const [activePath, setActivePath] = useState(0);
  const displayMainContent = () => {
    switch (activePath) {
      case 0:
        return <DashboardAppDashboard />;
      case 1:
        return <TransactionsAppDashboard />;
      case 2:
        return <ListIncomesAppDashboard />;
      case 3:
        return <ExpensesAppDashboard />;
      default:
        return <DashboardAppDashboard />;
    }
  };
  return (
    <div className="place-content-center w-full flex lg:min-h-[660px] ">
      <main className="max-w-[1080px] mt-4 flex flex-wrap lg:justify-between h-full w-full justify-center">
        <ExpensesAppHeader />
        <ExpensesAppLeftSidebar
          activePath={activePath}
          setActivePath={setActivePath}
        />
        {displayMainContent()}
      </main>
    </div>
  );
}

export default App;
