import axios from 'axios';
import React, { act } from 'react';
import { getExpenseDto, getIncomeDto } from '../../types/dtoTypes';
import { DashboardAppDashboard } from '../dashboard';
import { ExpensesAppProvider } from '../../context/context';
import { render, screen } from '@testing-library/react';
jest.mock('axios');

describe('Dashboard', () => {
  describe('Total Balance', () => {
    describe('When incomes and expenses are provided from the API', () => {
      const recievedExpenses: getExpenseDto[] = [
        {
          _id: '123',
          title: 'Some Expense',
          category: 'rent',
          amount: 120,
          description: 'Test Description',
          date: new Date('2022-01-01'),
        },
        {
          _id: '789',
          title: 'Test Expense 2',
          category: 'laundry',
          amount: 14,
          description: 'Test Description',
          date: new Date('2022-01-01'),
        },
      ];
      const recievedIncomes: getIncomeDto[] = [
        {
          _id: '123',
          title: 'Test Income 2',
          category: 'salary',
          amount: 1120,
          description: 'Test Description',
          date: new Date('2022-01-01'),
        },
        {
          _id: '456',
          title: 'Test Income 3',
          category: 'salary',
          amount: 140,
          description: 'Test Description',
          date: new Date('2022-01-01'),
        },
      ];
      beforeEach(async () => {
        jest.clearAllMocks();
        axios.get = jest.fn((url) => {
          if (url.includes('get-expense')) {
            return Promise.resolve({ data: recievedExpenses });
          }
          if (url.includes('get-income')) {
            return Promise.resolve({ data: recievedIncomes });
          }
          return Promise.reject(new Error('Unknown endpoint'));
        });
      });
      it('should show the total balance with the sum of incomes and expenses', async () => {
        await act(async () => {
          render(
            <ExpensesAppProvider>
              <DashboardAppDashboard />
            </ExpensesAppProvider>,
          );
        });
        expect(screen.getByTestId('total-balance-amount')).toHaveTextContent(
          /\$1126/i,
        );
      });
    });

    describe('When incomes and expenses are not provided from the API', () => {
      const recievedExpenses: getExpenseDto[] = [];
      const recievedIncomes: getIncomeDto[] = [];
      beforeEach(async () => {
        jest.clearAllMocks();
        axios.get = jest.fn((url) => {
          if (url.includes('get-expense')) {
            return Promise.resolve({ data: recievedExpenses });
          }
          if (url.includes('get-income')) {
            return Promise.resolve({ data: recievedIncomes });
          }
          return Promise.reject(new Error('Unknown endpoint'));
        });
      });
      it('should show the total balance of 0', async () => {
        await act(async () => {
          render(
            <ExpensesAppProvider>
              <DashboardAppDashboard />
            </ExpensesAppProvider>,
          );
        });
        expect(screen.getByTestId('total-balance-amount')).toHaveTextContent(
          /\$0/i,
        );
      });
    });
  });
});
