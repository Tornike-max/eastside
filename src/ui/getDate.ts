export const getDate = (dateTime: string): string => {
  const previousDate = new Date(dateTime);
  const currentDate = new Date();
  const difference = currentDate.getTime() - previousDate.getTime();

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  let secondsDifference = difference / 1000;

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(secondsDifference / seconds);
    if (interval >= 1) {
      const formattedDate = previousDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${interval} ${unit}${
        interval !== 1 ? "s" : ""
      } ago, ${formattedDate}`;
    }
  }

  return "Just now";
};
