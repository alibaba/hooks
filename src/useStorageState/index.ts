import { useState } from 'react';

interface IFuncUpdater<T> {
  (previousState?: T): T;
}

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

function useStorageState<T>(storage: Storage, key: string, defaultValue?: T | IFuncUpdater<T>) {
  const [state, setState] = useState<T | undefined>(() => getStoredValue());

  function getStoredValue() {
    const raw = storage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
    if (isFunction<IFuncUpdater<T>>(defaultValue)) {
      return defaultValue();
    }
    return defaultValue;
  }

  function updateState(value?: T | IFuncUpdater<T>) {
    if (typeof value === 'undefined') {
      storage.removeItem(key);
      setState(defaultValue);
    } else if (isFunction<IFuncUpdater<T>>(value)) {
      const previousState = getStoredValue();
      const currentState = value(previousState);
      storage.setItem(key, JSON.stringify(currentState));
      setState(currentState);
    } else {
      storage.setItem(key, JSON.stringify(value));
      setState(value);
    }
  }
  return [state, updateState];
}

export default useStorageState;
