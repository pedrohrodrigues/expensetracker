import {
  calculateTotalValue,
  getIncomeFilteredByMonthOfOfAYear,
} from '../generalHelpers';
import { incomesOf2027, incomeWithDifferentDates } from '../incomeMocks';

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
  describe('When incomes of a year ahead are provided', () => {
    const result = getIncomeFilteredByMonthOfOfAYear(
      incomesOf2027,
      new Date(2026, 1, 1),
    );

    it('should return no incomes', () => {
      expect(result).toEqual({});
    });
  });
  describe('When incomes of a year earlier are provided', () => {
    const result = getIncomeFilteredByMonthOfOfAYear(
      incomesOf2027,
      new Date(2028, 4, 4),
    );

    it('should return incomes from last year', () => {
      expect(result).toEqual({
        '12/2027': [incomesOf2027[1]],
      });
    });
  });
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
      });
    });
  });
});
