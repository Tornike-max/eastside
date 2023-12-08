export const formattedDate = (inputDate: string | number | Date) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function getFormattedDateSm(inputDate: string | number | Date) {
  const currentDate = new Date(inputDate);
  const year = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding leading zero if needed
  const day = ("0" + currentDate.getDate()).slice(-2); // Adding leading zero if needed

  return `${day}/${month}/${year}`;
}
