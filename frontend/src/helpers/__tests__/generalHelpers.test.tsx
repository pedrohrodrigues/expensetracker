import { getExpenseDto, getIncomeDto } from '../../types/dtoTypes';
import { getItemsForTheCurrentPage } from '../generalHelpers';

describe('getItemsForTheCurrentPage', () => {
  const items: getExpenseDto[] | getIncomeDto[] = Array.from(
    { length: 10 },
    (_, i) => ({
      id: i,
      _id: `id${i}`,
      title: `Income ${i}`,
      description: `Description ${i}`,
      category: 'salary',
      amount: 100 + i,
      date: new Date(),
    }),
  );
  describe('When it is in the first page', () => {
    let pageItems: getExpenseDto[] | getIncomeDto[] = [];
    beforeEach(() => {
      pageItems = getItemsForTheCurrentPage(1, 3, items);
    });
    it('should return correct items for first page', () => {
      expect(pageItems).toEqual(items.slice(0, 3));
    });
  });

  describe('When it is in last page', () => {
    let pageItems: getExpenseDto[] | getIncomeDto[] = [];
    beforeEach(() => {
      pageItems = getItemsForTheCurrentPage(5, 2, items);
    });
    it('should return correct items for last page', () => {
      expect(pageItems).toEqual(items.slice(8, 10));
    });
  });

  describe('When page is out of range', () => {
    let pageItems: getExpenseDto[] | getIncomeDto[] = [];
    beforeEach(() => {
      pageItems = getItemsForTheCurrentPage(6, 2, items);
    });
    it('should return an empty array if page is out of range', () => {
      expect(pageItems).toEqual([]);
    });
  });

  describe('When returning items for a middle page', () => {
    let pageItems: getExpenseDto[] | getIncomeDto[] = [];
    beforeEach(() => {
      pageItems = getItemsForTheCurrentPage(2, 4, items);
    });
    it('should return correct items for a middle page', () => {
      expect(pageItems).toEqual(items.slice(4, 8));
    });
  });
});
