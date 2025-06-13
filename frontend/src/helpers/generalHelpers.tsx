import { getExpenseDto, getIncomeDto } from '../types/dtoTypes';

export const calculateTotalValue = (receivedValue: number[]): number => {
  if (!receivedValue) {
    return 0;
  }

  return receivedValue.reduce((accumulator, item) => {
    return accumulator + item;
  }, 0);
};

export const getIncomeFilteredByMonthOfOfAYear = (
  incomes: getIncomeDto[],
  givenYear: Date,
) => {
  const oneYearBefore = new Date(givenYear);
  oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1);
  const incomesOfTheLastYear = incomes.filter((income) => {
    const incomeDate = new Date(income.date);
    return incomeDate >= oneYearBefore && incomeDate <= givenYear;
  });

  const incomesFilteredByMonth = incomesOfTheLastYear.reduce(
    (acc: { [key: string]: getIncomeDto[] }, income) => {
      const accID = `${income.date.getMonth() + 1}/${income.date.getFullYear()}`;
      if (!acc[accID]) {
        acc[accID] = [];
      }
      acc[accID].push(income);
      return acc;
    },
    {},
  );
  return incomesFilteredByMonth;
};

export const getItemsForTheCurrentPage = (
  page: number,
  itemsPerPage: number,
  items: getIncomeDto[] | getExpenseDto[],
) => {
  const lastPostIndex = page * itemsPerPage;
  return items.slice(lastPostIndex - itemsPerPage, lastPostIndex);
};

export const handleAmountOfPages = (
  totalNumberOfItems: number,
  itemsPerPage: number,
) => {
  return Math.ceil(totalNumberOfItems / itemsPerPage);
};
