import { calculateTotalValue } from '../generalHelpers';

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
