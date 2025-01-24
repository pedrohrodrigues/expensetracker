import { useFetchIncome } from '../useFetchIncome';
import { getIncome } from '../../apiRequests/incomeRequests';
import { IncomeActionTypes } from '../../stateManagement/actions/incomeActions';
import { useExpensesAppContext } from '../../context/context';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

jest.mock('../../apiRequests/incomeRequests');
jest.mock('../../context/context');

describe('useFetchIncome', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    useExpensesAppContext.mockReturnValue({
      expensesAppDispatch: mockDispatch,
    });
  });
  it('should fetch income and dispatch the result', async () => {
    const mockIncomes = [
      {
        id: 1,
        title: 'Income 1',
        category: 'salary',
        amount: 100,
        date: '2025-01-01',
      },
      {
        id: 2,
        title: 'Income 2',
        category: 'salary',
        amount: 200,
        date: '2025-01-01',
      },
    ];
    getIncome.mockResolvedValue(mockIncomes);
    const { result } = renderHook(() => useFetchIncome());

    await act(async () => {
      await result.current();
    });
    expect(getIncome).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: IncomeActionTypes.GetIncome,
      payload: mockIncomes,
    });
  });

  it('should handle error', async () => {
    const error = new Error('Error fetching incomes');
    getIncome.mockRejectedValue(error);
    const { result } = renderHook(() => useFetchIncome());

    await act(async () => {
      await result.current();
    });
    expect(getIncome).toHaveBeenCalledTimes(1);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
