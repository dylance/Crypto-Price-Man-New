export const formatCurrency = (number, decimals = 2, baseCurrency = 'USD') => {
  if (!number) {
    return '';
  }

  if (baseCurrency === 'USD') {
    return `$${ parseFloat(number)
      .toFixed(decimals)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }`;
  }
  return `${ parseFloat(number).toFixed(decimals).toString() } ${ baseCurrency }`;
};
