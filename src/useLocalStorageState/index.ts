import { useState } from 'react';

export default function useLocalStorageState<T = string>(key: string, defaultValue?: T) {
  const [state, setState] = useState<T | undefined>(() =>
    (localStorage.getItem(key) === null ? defaultValue : JSON.parse(localStorage.getItem(key)!)),
  );
  function updateState(value?: T) {
    if (value === undefined) {
      localStorage.removeItem(key);
      setState(defaultValue);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    }
  }
  return [state, updateState] as const;
}
