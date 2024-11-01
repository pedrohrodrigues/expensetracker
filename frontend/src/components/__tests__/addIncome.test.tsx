import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByTestId,
} from '@testing-library/react';
import axios from 'axios';
import { addIncomeDto } from '../../types/dtoTypes';
import { AddIncomesAppDashboard } from '../addIncome';
import { BASE_URL } from '../../apiRequests/apiRequests';
const refreshListMock = jest.fn();
jest.mock('axios');

describe('addIncome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should make a successful POST request with valid income data', async () => {
    const mockedAxiosPost = axios.post as jest.MockedFunction<
      typeof axios.post
    >;
    mockedAxiosPost.mockImplementation(() =>
      Promise.resolve({
        data: { success: true, message: 'Income added successfully' },
      }),
    );
    render(<AddIncomesAppDashboard refreshList={refreshListMock} />);
    const form = await screen.findByTestId('add-income-form');
    expect(form).toBeInTheDocument();
    const titleInput = await screen.findByTestId('title');
    const categoryInput = await screen.findByTestId('category');
    const amountInput = await screen.findByTestId('amount');
    const descriptionInput = await screen.findByTestId('description');
    const dateInput = await screen.findByTestId('date-input');

    const date = new Date('2022-01-01');

    fireEvent.change(titleInput, { target: { value: 'Test Income' } });
    fireEvent.change(categoryInput, { target: { value: 'salary' } });
    fireEvent.change(amountInput, { target: { value: 100 } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });
    fireEvent.change(dateInput, { target: { value: date } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockedAxiosPost).toHaveBeenCalledWith(`${BASE_URL}add-income`, {
        title: 'Test Income',
        category: 'salary',
        amount: '100',
        description: 'Test Description',
        date: expect.any(Date),
      });
    });
  });
});
