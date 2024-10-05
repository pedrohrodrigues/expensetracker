import React from 'react';
import { ExpensesAppHeader } from './components/header';
import { ExpensesAppLeftSidebar } from './components/leftSidebar';
import { ExpensesAppDashboard } from './components/dashboard';

function App() {
  return (
    <div className="place-content-center w-full flex lg:min-h-[660px] lg:h-5/6 lg:absolute">
      <main className="max-w-[1080px] mt-4 flex flex-wrap lg:justify-between h-full w-full justify-center">
        <ExpensesAppHeader />
        <ExpensesAppLeftSidebar />
        <ExpensesAppDashboard />
      </main>
    </div>
  );
}

export default App;
