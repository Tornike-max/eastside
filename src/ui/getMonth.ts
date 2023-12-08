export const getMonth = (dateTime: string): string => {
  const previousDate = new Date(dateTime);

  const day = previousDate.getDate().toString().padStart(2, "0");
  const month = (previousDate.getMonth() + 1).toString().padStart(2, "0");
  const year = previousDate.getFullYear().toString().slice(-2);

  return `${day}.${month}.${year}`;
};
