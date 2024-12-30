export const calculateTotalValue = (receivedValue: number[]): number => {
  if (!receivedValue) {
    return 0;
  }

  return receivedValue.reduce((accumulator, item) => {
    return accumulator + item;
  }, 0);
};
