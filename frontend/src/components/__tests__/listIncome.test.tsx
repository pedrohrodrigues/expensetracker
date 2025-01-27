import React from 'react';
import axios from 'axios';
import { IncomesAppDashboard } from '../incomes';
import {
  act,
  render,
  renderHook,
  waitFor,
  screen,
} from '@testing-library/react';
import { getIncomeDto } from '../../types/dtoTypes';
import { ExpensesAppProvider } from '../../context/context';
import userEvent from '@testing-library/user-event';
jest.mock('axios');

describe('List Incomes', () => {
  describe('When incomes are provided from the API', () => {
    const recievedIncomes: getIncomeDto[] = [
      {
        _id: '123',
        title: 'Test Income 2',
        category: 'salary',
        amount: 120,
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
      axios.get = jest.fn().mockResolvedValue({ data: recievedIncomes });
      await act(async () => {
        render(
          <ExpensesAppProvider>
            <IncomesAppDashboard />
          </ExpensesAppProvider>,
        );
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_URL}get-income`,
      );
    });
    it('should list title and ammount of the provided incomes', async () => {
      await waitFor(() => {
        expect(screen.getByText(/Test Income 2/i)).toBeInTheDocument();
        expect(screen.getByText(/\$120/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Income 3/i)).toBeInTheDocument();
        expect(screen.getByText(/\$140/i)).toBeInTheDocument();
      });
    });
    it('should show the total amount the provided incomes', async () => {
      const totalAmountElement = await screen.getByTestId(
        'total-incomes-amount',
      );
      expect(totalAmountElement).toHaveTextContent(/\$260/i);
    });

    describe('Delete Incomes', () => {
      describe('When the delete income button is clicked', () => {
        beforeEach(async () => {
          axios.delete.mockResolvedValue({ status: 200 });
          axios.get.mockResolvedValueOnce({
            data: recievedIncomes.filter((income) => income._id !== '123'),
          });
          const deleteButton = await screen.getByTestId('delete-income-123');
          await act(async () => {
            userEvent.click(deleteButton);
          });
          await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledTimes(1);
          });
        });

        it('should remove the income from the list', async () => {
          const incomesReturnMessageElement = await screen.getByTestId(
            'return-promise-message',
          );
          expect(incomesReturnMessageElement).toHaveTextContent(
            /\Income successfully deleted/i,
          );
          const deletedIncome = await screen.queryByText(/Test Income 2/i);
          expect(deletedIncome).not.toBeInTheDocument();
        });
      });

      describe('When the delete income button is clicked but there is an error with the request', () => {
        beforeEach(async () => {
          axios.delete.mockResolvedValue({ status: 404 });
          const deleteButton = await screen.getByTestId('delete-income-123');
          await act(async () => {
            userEvent.click(deleteButton);
          });
          await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledTimes(1);
          });
        });
        it('should show an error message an keep the income in the list', async () => {
          const incomesReturnMessageElement = await screen.getByTestId(
            'return-promise-message',
          );
          expect(incomesReturnMessageElement).toHaveTextContent(
            'Error trying to delete income, please try again',
          );
          const deletedIncome = await screen.queryByText(/Test Income 2/i);
          expect(deletedIncome).toBeInTheDocument();
          ('');
        });
      });
    });
  });
});
