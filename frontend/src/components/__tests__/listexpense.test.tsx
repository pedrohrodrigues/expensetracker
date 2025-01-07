import React, { act } from 'react';
import { getExpenseDto } from '../../types/dtoTypes';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import { ExpensesAppProvider } from '../../context/context';
import { ListExpensesAppDashboard } from '../expenses';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

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
    amount: 140,
    description: 'Test Description',
    date: new Date('2022-01-01'),
  },
];

describe('List Expenses', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  describe('When expenses are provided from the API', () => {
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
        expect(screen.getByText(/Some Expense/i)).toBeInTheDocument();
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
        expect(screen.queryByText(/Some Expense/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Delete Expense', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      axios.get = jest.fn().mockResolvedValue({ data: recievedExpenses });
      await act(async () => {
        render(
          <ExpensesAppProvider>
            <ListExpensesAppDashboard />
          </ExpensesAppProvider>,
        );
      });
    });
    describe('When the delete expense button is clicked', () => {
      beforeEach(async () => {
        axios.delete.mockResolvedValue({ status: 200 });
        axios.get.mockResolvedValueOnce({
          data: recievedExpenses.filter((expense) => expense._id !== '123'),
        });
        const deleteButton = await screen.getByTestId('delete-expense-123');
        await act(async () => {
          userEvent.click(deleteButton);
        });
        await waitFor(() => {
          expect(axios.delete).toHaveBeenCalledTimes(1);
        });
      });

      it('should remove the expense from the list', async () => {
        const expensesReturnMessageElement = await screen.getByTestId(
          'return-promise-message',
        );
        expect(expensesReturnMessageElement).toHaveTextContent(
          /\Expense successfully deleted/i,
        );
        const deletedExpense = await screen.queryByText(/Some Expense/i);
        expect(deletedExpense).not.toBeInTheDocument();
      });
    });

    describe('When the delete income button is clicked but there is an error with the request', () => {
      beforeEach(async () => {
        axios.delete.mockResolvedValue({ status: 404 });
        const deleteButton = await screen.getByTestId('delete-expense-123');
        await act(async () => {
          userEvent.click(deleteButton);
        });
        await waitFor(() => {
          expect(axios.delete).toHaveBeenCalledTimes(1);
        });
      });
      it('should show an error message an keep the income in the list', async () => {
        const expensesReturnMessageElement = await screen.getByTestId(
          'return-promise-message',
        );
        expect(expensesReturnMessageElement).toHaveTextContent(
          'Error trying to delete expense, please try again',
        );
        const deletedExpense = await screen.queryByText(/Some Expense/i);
        expect(deletedExpense).toBeInTheDocument();
        ('');
      });
    });
  });
});
