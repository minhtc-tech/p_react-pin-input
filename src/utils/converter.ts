export const getRegExp = (value: string) => {
  return new RegExp(value.slice(1, -1));
};
