import axios from 'axios';
import React, { createContext, useState } from 'react';

interface ExpensesAppProviderProps {
  children: React.ReactNode;
}
interface ExpensesAppContextType {
  setExampleValue: React.Dispatch<React.SetStateAction<string>>;
}
const ExpensesAppContext = createContext<ExpensesAppContextType | undefined>(
  undefined,
);

interface addIncomeDto {
  title: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export const AppProvider = ({ children }: ExpensesAppProviderProps) => {
  const [exampleValue, setExampleValue] = useState<string>('default value');
  const [incomes, setIncomes] = useState<[]>([]);
  const [expenses, setExpenses] = useState<[]>([]);
  const [error, setError] = useState(null);

  const addIncome = async (income: addIncomeDto) => {
    const response = await axios
      .post('${BASE_URL}add-income', income)
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  //   const value = {
  //     exampleValue,
  //     addIncome,
  //   };
  //   return (
  //     <ExpensesAppContext.Provider value={value}>
  //       {children}
  //     </ExpensesAppContext.Provider>
  //   );
  // };
};
