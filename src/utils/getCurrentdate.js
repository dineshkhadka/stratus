import suffix from "./getSuffix";

export const getCurrentDate = () => {
  const today = new Date();

  const date = `${today.getDate()}${suffix(
    today.getDate()
  )} ${today.toLocaleDateString("default", {
    month: "long",
  })}, ${today.getFullYear()}`;
  return date;
};
