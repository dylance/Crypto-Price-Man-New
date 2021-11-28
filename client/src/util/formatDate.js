export const formatDate = (dateString) => {
  const subDates = dateString.substring(0, 10).split('-');

  return `${subDates[1]}-${subDates[2]}-${subDates[0]}`;
};
