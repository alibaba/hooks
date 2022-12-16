const is = (value1: any, value2: any) =>
  (value1 === value2 && (value1 !== 0 || 1 / value1 === 1 / value2)) ||
  (value1 !== value1 && value2 !== value2);

export const objectIs = typeof Object.is === 'function' ? Object.is : is;
