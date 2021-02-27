const getSumOfArrayValues = (arr, keyToSum) => {
  const sum = arr.reduce((acc, deposit) => {
    return acc + parseFloat(deposit[keyToSum]);
  }, 0);

  return sum;
};

module.exports = getSumOfArrayValues;
