import axios from 'axios';
import { addIncomeDto } from '../../types/dtoTypes';
import { addIncome, getIncome } from '../apiRequests';
import { BASE_URL } from '../apiRequests';

jest.mock('axios');

describe('addIncome function', () => {
  const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
  it('should make a successful POST request with valid income data', async () => {
    const incomeData: addIncomeDto = {
      title: 'Test Income',
      amount: 100,
      description: 'Test income description',
      date: new Date(),
      category: 'Test category',
    };
    mockedAxiosPost.mockImplementation(() =>
      Promise.resolve({
        data: { success: true, message: 'Income added successfully' },
      }),
    );
    await addIncome(incomeData);
    expect(mockedAxiosPost).toHaveBeenCalledTimes(1);
    expect(mockedAxiosPost).toHaveBeenCalledWith(
      `${BASE_URL}add-income`,
      incomeData,
    );
  });
  it('should catch and log error when POST request fails', async () => {
    const incomeData: addIncomeDto = {
      title: 'Test Income',
      amount: 100,
      description: 'Test income description',
      date: new Date(),
      category: 'Test category',
    };
    mockedAxiosPost.mockRejectedValue(new Error('Test error'));
    console.log = jest.fn();
    await addIncome(incomeData);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      'Error adding incomes:',
      'Test error',
    );
  });
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
