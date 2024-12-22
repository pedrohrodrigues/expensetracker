import axios from 'axios';
import { addIncomeDto } from '../../types/dtoTypes';
import { addIncome, deleteIncome, getIncome } from '../apiRequests';
import { BASE_URL } from '../apiRequests';

jest.mock('axios');

describe('addIncome function', () => {
  it('should make a successful POST request with valid income data', async () => {
    const incomeData = {
      title: 'Test Income',
      amount: 100,
      description: 'Test income description',
      date: new Date(),
      category: 'Test category',
    };
    axios.post.mockResolvedValue({ status: 200 });
    const result = await addIncome(incomeData);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${BASE_URL}add-income`,
      incomeData,
    );
    expect(result).toBe(200);
  });
  it('should catch and log error when POST request fails', async () => {
    const incomeData: addIncomeDto = {
      title: 'Test Income',
      amount: 100,
      description: 'Test income description',
      date: new Date(),
      category: 'Test category',
    };
    console.log = jest.fn();
    axios.post.mockRejectedValue('Test error');
    await addIncome(incomeData);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      'Error adding incomes:',
      'Test error',
    );
  });

  describe('getIncome', () => {
    it('should return income data on successful GET request', async () => {
      const mockResponse = {
        data: [
          { id: 1, amount: 100 },
          { id: 2, amount: 200 },
        ],
      };
      axios.get.mockResolvedValue(mockResponse);
      const result = await getIncome();
      expect(result).toEqual(mockResponse.data);
    });
    it('should return null on failed GET request', async () => {
      const mockError = new Error('Failed to fetch income data');
      axios.get.mockRejectedValue(mockError);
      const result = await getIncome();
      expect(result).toBeNull();
    });
    it('should log error to console on failed GET request', async () => {
      const mockError = new Error('Failed to fetch income data');
      axios.get.mockRejectedValue(mockError);
      console.log = jest.fn();
      await getIncome();
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith(
        'Error getting incomes:',
        mockError,
      );
    });
  });
});

describe('deleteIncome', () => {
  describe('When a valid id is provided', () => {
    beforeEach(() => {
      axios.delete.mockResolvedValue({ status: 200 });
    });
    it('should make a successful DELETE request and return status 200', async () => {
      const result = await deleteIncome('valid-id');
      expect(result).toBe(200);
    });
  });
  describe('When an invalid id is provided', () => {
    beforeEach(() => {
      axios.delete.mockResolvedValue({ status: 404 });
    });
    it('should make an  unsuccessful DELETE request and return status 404', async () => {
      const result = await deleteIncome('invalid-id');
      expect(result).toBe(404);
    });
  });
  describe('When an error occurs', () => {
    beforeEach(() => {
      axios.delete.mockRejectedValue({ status: 500 });
    });
    it('should make an  unsuccessful DELETE request and return null', async () => {
      const result = await deleteIncome('invalid-id');
      expect(result).toBe(null);
    });
  });
});
