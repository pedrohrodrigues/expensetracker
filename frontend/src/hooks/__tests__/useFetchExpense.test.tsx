import { useFetchExpense } from '../useFetchExpense';
import { getExpense } from '../../apiRequests/expenseRequests';
import { useExpensesAppContext } from '../../context/context';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { ExpenseActionTypes } from '../../stateManagement/actions/expenseActions';

jest.mock('../../apiRequests/expenseRequests');
jest.mock('../../context/context');

describe('useFetchExpense', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    useExpensesAppContext.mockReturnValue({
      expensesAppDispatch: mockDispatch,
    });
  });
  it('should fetch expenses and dispatch the result', async () => {
    const mockExpenses = [
      {
        id: 1,
        title: 'Expense 1',
        category: 'rent',
        amount: 100,
        date: '2025-01-01',
      },
      {
        id: 2,
        title: 'Expense 2',
        category: 'college',
        amount: 200,
        date: '2025-01-01',
      },
    ];
    getExpense.mockResolvedValue(mockExpenses);
    const { result } = renderHook(() => useFetchExpense());

    await act(async () => {
      await result.current();
    });
    expect(getExpense).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ExpenseActionTypes.GetExpense,
      payload: mockExpenses,
    });
  });

  it('should handle error', async () => {
    const error = new Error('Error fetching expenses');
    getExpense.mockRejectedValue(error);
    const { result } = renderHook(() => useFetchExpense());

    await act(async () => {
      await result.current();
    });
    expect(getExpense).toHaveBeenCalledTimes(1);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
