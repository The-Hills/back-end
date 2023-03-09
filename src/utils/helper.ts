const zeroFill = (num: number) => {
  return num <= 9 ? `0${num}` : String(num);
};

export const getCreateDate = (date: Date) => {
  return `${date.getFullYear()}${zeroFill(date.getMonth() + 1)}${zeroFill(
    date.getDate(),
  )}${zeroFill(date.getHours())}${zeroFill(date.getMinutes())}${zeroFill(
    date.getSeconds(),
  )}`;
};
