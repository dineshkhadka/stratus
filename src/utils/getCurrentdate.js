import suffix from "./getSuffix";

const today = new Date();

export const getFullDate = () => {
  const date = `${today.getDate()}${suffix(
    today.getDate()
  )} ${today.toLocaleDateString("default", {
    month: "long",
  })}, ${today.getFullYear()}`;
  return date;
};
export const getCurrentDate = () => {
  const date = today.getDate();
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
