import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BASE_URL } from '../../apiRequests/incomeRequests';
import axios from 'axios';
import { AddExpensesAppDashboard } from '../addExpense';
jest.mock('axios');
const refreshListMock = jest.fn();

describe('addExpense', () => {
  beforeEach(() => {
    render(<AddExpensesAppDashboard refreshList={refreshListMock} />);
    jest.clearAllMocks();
  });
  describe('When all fields are provided', () => {
    it('should make a successful POST request with valid income data   ', async () => {
      axios.post = jest.fn().mockResolvedValue({});
      const mockResponse = {
        title: 'Test Expense',
        category: 'rent',
        amount: '100',
        description: 'Test Description',
        date: expect.any(Date),
      };
      const form = await screen.findByTestId('add-expense-form');
      expect(form).toBeInTheDocument();
      const fields = [
        { name: 'title', value: 'Test Expense' },
        { name: 'category', value: 'rent' },
        { name: 'amount', value: 100 },
        { name: 'description', value: 'Test Description' },
        { name: 'date-input', value: '2022-01-01' },
      ];

      fields.forEach(({ name, value }) => {
        fireEvent.change(screen.getByTestId(name), { target: { value } });
      });

      fireEvent.submit(form);
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
          `${BASE_URL}add-expense`,
          mockResponse,
        );
      });
    });
  });
});
