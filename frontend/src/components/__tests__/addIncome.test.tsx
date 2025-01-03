import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByTestId,
} from '@testing-library/react';
import axios from 'axios';
import { AddIncomesAppDashboard } from '../addIncome';
import { BASE_URL } from '../../apiRequests/incomeRequests';
const refreshListMock = jest.fn();
jest.mock('axios');

describe('addIncome', () => {
  beforeEach(() => {
    render(<AddIncomesAppDashboard refreshList={refreshListMock} />);
    jest.clearAllMocks();
  });
  describe('When all fields are provided', () => {
    it('should make a successful POST request with valid income data   ', async () => {
      axios.post = jest.fn().mockResolvedValue({});
      const mockResponse = {
        title: 'Test Income',
        category: 'salary',
        amount: '100',
        description: 'Test Description',
        date: expect.any(Date),
      };
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
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
          `${BASE_URL}add-income`,
          mockResponse,
        );
      });
    });
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
      'displays an error message if the %s field is empty',
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
