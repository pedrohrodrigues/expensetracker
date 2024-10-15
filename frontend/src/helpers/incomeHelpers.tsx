export const calculateTotalIncomesValue = (incomesValue: number[]): number => {
  if (!incomesValue) {
    return 0;
  }

  return incomesValue.reduce((accumulator, item) => {
    return accumulator + item;
  }, 0);
};
