import { useState } from 'react';

export default function useLocalStorageState<T = string>(key: string, defaultValue?: T) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key) || 'null') || defaultValue,
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
