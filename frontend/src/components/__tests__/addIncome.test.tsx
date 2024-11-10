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
    render(<AddIncomesAppDashboard refreshList={refreshListMock} />);
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
    const form = await screen.findByTestId('add-income-form');
    expect(form).toBeInTheDocument();
    const fields = [
      { name: 'title', value: 'Test Income' },
      { name: 'category', value: 'salary' },
      { name: 'amount', value: 100 },
      { name: 'description', value: 'Test Description' },
      { name: 'date-input', value: '2022-01-01' },
    ];

    fields.forEach(({ name, value }) => {
      fireEvent.change(screen.getByTestId(name), { target: { value } });
    });

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

  it('should return an error message if a field the form is empty', async () => {
    const form = await screen.findByTestId('add-income-form');
    expect(form).toBeInTheDocument();
    fireEvent.submit(form);
    const submitMessage = await screen.findByTestId('submit-message');
    expect(submitMessage).toHaveTextContent('Please fill all required fields');
  });

  describe('AddIncomeAppDashboard input validations', () => {
    const getInputFormFieldValue = (fieldName: string): string | number => {
      switch (fieldName) {
        case 'title':
          return 'input title';
        case 'category':
          return 'salary';
        case 'amount':
          return '100';
        case 'description':
          return 'description';
        default:
          return '';
      }
    };
    async function expectErrorMessage() {
      const submitMessage = await screen.findByTestId('submit-message');
      expect(submitMessage).toHaveTextContent(
        'Please fill all required fields',
      );
    }

    it('should return an error message if a field the form is empty', async () => {
      const form = await screen.findByTestId('add-income-form');
      expect(form).toBeInTheDocument();
      fireEvent.submit(form);
      const submitMessage = await screen.findByTestId('submit-message');
      expect(submitMessage).toHaveTextContent(
        'Please fill all required fields',
      );
    });

    // Date doesn't need to be tested since it always has a default value

    const fields = [
      {
        name: 'title',
      },
      {
        name: 'category',
      },
      {
        name: 'amount',
      },
      {
        name: 'description',
      },
    ];

    it.each(fields)(
      'displays an error message when the %s field is empty',
      async (field) => {
        const form = await screen.findByTestId('add-income-form');

        fields
          .filter((f) => f.name !== field.name)
          .forEach((f) =>
            fireEvent.change(screen.getByTestId(f.name), {
              target: { value: getInputFormFieldValue(f.name) },
            }),
          );

        fireEvent.submit(form);
        await expectErrorMessage();
      },
    );
  });
});
