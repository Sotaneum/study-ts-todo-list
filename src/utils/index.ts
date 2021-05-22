export const toDateWithoutTime = (targetDate: string): string => {
  const date = new Date(targetDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `${0}` : ''}${month}-${day}`;
};
