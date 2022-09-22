import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const useDefault = <T, U>(
  defaultState: T,
  initialState: U,
): [T | U, Dispatch<SetStateAction<U | null | undefined>>] => {
  const [value, setValue] = useState<U>(initialState);

  const isEmptyValue = value === undefined || value === null;

  return [isEmptyValue ? defaultState : value, setValue];
};

export default useDefault;
