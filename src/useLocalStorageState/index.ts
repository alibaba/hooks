import { useState } from 'react';

function useLocalStorageState<T = undefined>(key: string): [T | undefined, (value?: T) => void];
function useLocalStorageState<T>(key: string, value: T): [T, (value?: T) => void];

function useLocalStorageState<T>(key: string, defaultValue?: T) {
  const [state, setState] = useState<T | undefined>(() =>
    (localStorage.getItem(key) === null ? defaultValue : JSON.parse(localStorage.getItem(key)!)),
  );
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
