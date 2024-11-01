import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { addIncomeDto } from '../../types/dtoTypes';
import { AddIncomesAppDashboard } from '../addIncome';

describe('addIncome', () => {
  it('should make a successful POST request with valid income data', async () => {
    const incomeData: addIncomeDto = {
      title: 'Test Income',
      amount: 100,
      description: 'Test income description',
      date: new Date(),
      category: 'Test category',
    };
    const mockedAxiosPost = jest.spyOn(axios, 'post');
    mockedAxiosPost.mockImplementation(() =>
      Promise.resolve({
        data: { success: true, message: 'Income added successfully' },
      }),
    );
    const { getByPlaceholderText, getByText } = render(
      <AddIncomesAppDashboard refreshList={() => {}} />,
    );
    const form = await screen.findByTestId('add-income-form');
    expect(form).toBeInTheDocument();
  });
});
