import { getIncomeDto } from '../types/dtoTypes';

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
  currentYear: Date,
) => {
  const oneYearBefore = currentYear.getFullYear() - 1;
  const incomesOfTheLastYear = incomes.filter((income) => {
    const incomeDate = new Date(income.date);
    return (
      incomeDate.getFullYear() >= oneYearBefore &&
      incomeDate.getFullYear() <= currentYear.getFullYear()
    );
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
