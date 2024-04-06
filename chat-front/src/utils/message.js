export function convertSecondsToDate(seconds) {
  let date = new Date(seconds * 1000);
  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    monthName: date.toLocaleString("default", { month: "long" }),
    month: date.getMonth,
    year: date.getFullYear(),
  };
}

export function getMessageStringDate(timestamp) {
  const date = convertSecondsToDate(timestamp);
  return date["hours"] + ":" + date["minutes"];
}
