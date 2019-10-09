import { useState } from 'react';

export default function useStorageState<T extends string = string>(key: string, defaultValue?: T) {
  const [state, setState] = useState(() => (localStorage.getItem(key) as T) || defaultValue);
  function updateState(value?: T) {
    if (value === undefined) {
      localStorage.removeItem(key);
      setState(defaultValue);
    } else {
      localStorage.setItem(key, value as string);
      setState(value);
    }
  }
  return [state, updateState] as [typeof state, typeof updateState];
}
