import React, { act } from 'react';
import { getExpenseDto } from '../../types/dtoTypes';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import { ExpensesAppProvider } from '../../context/context';
import { ListExpensesAppDashboard } from '../expenses';

jest.mock('axios');
describe('List Expenses', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  describe('When expenses are provided from the API', () => {
    const recievedExpenses: getExpenseDto[] = [
      {
        _id: '123',
        title: 'Some Test Expense',
        category: 'rent',
        amount: 120,
        description: 'Test Description',
        date: new Date('2022-01-01'),
      },
      {
        _id: '789',
        title: 'Test Expense 2',
        category: 'laundry',
        amount: 140,
        description: 'Test Description',
        date: new Date('2022-01-01'),
      },
    ];
    beforeEach(async () => {
      axios.get = jest.fn().mockResolvedValue({ data: recievedExpenses });
      await act(async () => {
        render(
          <ExpensesAppProvider>
            <ListExpensesAppDashboard />
          </ExpensesAppProvider>,
        );
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_URL}get-expense`,
      );
    });
    it('should render the list of expenses', async () => {
      await waitFor(() => {
        expect(screen.getByText(/Some Test Expense/i)).toBeInTheDocument();
        expect(screen.getByText(/\$120/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Expense 2/i)).toBeInTheDocument();
        expect(screen.getByText(/\$140/i)).toBeInTheDocument();
      });
    });
    it('should render the total amount of expenses', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('total-expense-amount')).toHaveTextContent(
          /\$260/i,
        );
      });
    });
  });

  describe('When expenses are not provided from the API', () => {
    beforeEach(async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [] });
      await act(async () => {
        render(
          <ExpensesAppProvider>
            <ListExpensesAppDashboard />
          </ExpensesAppProvider>,
        );
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_URL}get-expense`,
      );
    });
    it('should not render the list of expenses', async () => {
      await waitFor(() => {
        expect(
          screen.queryByText(/Some Test Expense/i),
        ).not.toBeInTheDocument();
      });
    });
  });
});
