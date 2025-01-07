import axios from 'axios';
import { addExpense, deleteExpense, getExpense } from '../expenseRequests';

jest.mock('axios');

describe('getExpense', () => {
  const mockResponse = {
    data: [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ],
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return expenses data on successful GET request', async () => {
    axios.get.mockResolvedValue(mockResponse);
    const result = await getExpense();
    expect(result).toEqual(mockResponse.data);
  });
  it('should return null on failed GET request', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch expense data'));
    const result = await getExpense();
    expect(result).toBeNull();
  });
});

describe('addExpense', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('When all fields are provided', () => {
    const mockExpense = {
      amount: 100,
      title: 'Test Expense',
      category: 'rent',
      description: 'Test Description',
      date: new Date('2022-01-01'),
    };
    it('should make a successful POST request with valid expense data', async () => {
      axios.post = jest.fn().mockResolvedValue(mockExpense);
      const result = await addExpense(mockExpense);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_URL}add-expense`,
        mockExpense,
      );
    });
  });
  describe('When all fields are provided', () => {
    it('should catch and log error when POST request fails', async () => {
      const expenseData = {
        amount: 100,
        title: 'Test Expense',
        category: 'rent',
        description: 'Test Description',
        date: new Date('2022-01-01'),
      };
      console.log = jest.fn();
      axios.post.mockRejectedValue('Test error');
      await addExpense(expenseData);
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(
        'Error adding expenses:',
        'Test error',
      );
    });
  });
});

describe('deleteExpense', () => {
  describe('When a valid id is provided', () => {
    beforeEach(() => {
      axios.delete.mockResolvedValue({ status: 200 });
    });
    it('should make a successful DELETE request and return status 200', async () => {
      const result = await deleteExpense('valid-id');
      expect(result).toBe(200);
    });
  });
  describe('When an invalid id is provided', () => {
    beforeEach(() => {
      axios.delete.mockResolvedValue({ status: 404 });
    });
    it('should make an  unsuccessful DELETE request and return status 404', async () => {
      const result = await deleteExpense('invalid-id');
      expect(result).toBe(404);
    });
  });
  describe('When an error occurs', () => {
    beforeEach(() => {
      axios.delete.mockRejectedValue({ status: 500 });
    });
    it('should make an  unsuccessful DELETE request and return null', async () => {
      const result = await deleteExpense('invalid-id');
      expect(result).toBe(null);
    });
  });
});
