import { useState } from 'react';

function useLocalStorageState<T = undefined>(key: string): [T | undefined, (value?: T) => void];
function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, (value?: T) => void];
function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  const [state, setState] = useState<T | undefined>(() => {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      return JSON.parse(raw);
    }
    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)();
    }
      return defaultValue;
  });
  function updateState(value?: T) {
    if (typeof value === 'undefined') {
      localStorage.removeItem(key);
      setState(defaultValue);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    }
  }
  return [state, updateState];
}

export default useLocalStorageState;
