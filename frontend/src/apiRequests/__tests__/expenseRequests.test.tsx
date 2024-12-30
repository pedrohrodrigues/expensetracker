import axios from 'axios';
import { getExpense } from '../expenseRequests';

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
