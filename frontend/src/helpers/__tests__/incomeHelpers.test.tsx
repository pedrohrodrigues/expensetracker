import {
  calculateTotalValue,
  getIncomeFilteredByMonthOfOfAYear,
} from '../generalHelpers';
import { incomeWithDifferentDates } from '../incomeMocks';

describe('calculateTotalValue', () => {
  it('should return 0 when incomesValue is empty', () => {
    expect(calculateTotalValue([])).toBe(0);
  });
  it('should return the sum of incomesValue', () => {
    expect(calculateTotalValue([1, 2, 3])).toBe(6);
    expect(calculateTotalValue([10, 20, 30])).toBe(60);
  });
  it('should handle negative values correctly', () => {
    expect(calculateTotalValue([-1, -2, -3])).toBe(-6);
    expect(calculateTotalValue([1, -2, 3])).toBe(2);
  });
});

describe('getIncomeFilteredByMonthOfOfAYear', () => {
  describe('When incomes of different year are provided', () => {
    const result = getIncomeFilteredByMonthOfOfAYear(
      incomeWithDifferentDates,
      new Date(2025, 1, 26),
    );

    it('should return object with incomes of the last year separated by month', () => {
      expect(result).toEqual({
        ['2/2025']: [incomeWithDifferentDates[0], incomeWithDifferentDates[6]],
        ['1/2025']: [incomeWithDifferentDates[2]],
        ['12/2024']: [incomeWithDifferentDates[3]],
        ['4/2025']: [incomeWithDifferentDates[5]],
      });
    });
  });
});
