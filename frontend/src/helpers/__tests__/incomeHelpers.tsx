import { calculateTotalIncomesValue } from '../incomeHelpers';

describe('calculateTotalIncomesValue', () => {
  it('should return 0 when incomesValue is empty', () => {
    expect(calculateTotalIncomesValue([])).toBe(0);
  });
  it('should return the sum of incomesValue', () => {
    expect(calculateTotalIncomesValue([1, 2, 3])).toBe(6);
    expect(calculateTotalIncomesValue([10, 20, 30])).toBe(60);
  });
  it('should handle negative values correctly', () => {
    expect(calculateTotalIncomesValue([-1, -2, -3])).toBe(-6);
    expect(calculateTotalIncomesValue([1, -2, 3])).toBe(2);
  });
});
