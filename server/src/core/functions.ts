export const formatCurrencyValue = (value) => {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
};
