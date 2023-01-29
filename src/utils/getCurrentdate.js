import suffix from "./getSuffix";

const today = new Date();

export const getFullDate = () => {
  return {
    date: getCurrentDate(),
    day: getCurrentWeekDay(),
    dateSuffix: suffix(getCurrentDate()),
    month: getCurrentMonth(),
    year: getCurrentYear(),
  };
};
export const getCurrentDate = () => {
  const date = today.getDate();
  return date;
};

export const getCurrentWeekDay = () => {
  const date = today.toLocaleDateString("default", { weekday: "long" });
  return date;
};

export const getCurrentMonth = () => {
  const date = today.toLocaleDateString("default", {
    month: "long",
  });
  return date;
};
export const getCurrentYear = () => {
  const date = today.getFullYear();
  return date;
};

export const getCurrentHour = () => {
  const date = today.getHours();
  return date;
};
