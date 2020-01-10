import { useState } from 'react';

interface IInitFunc<T> {
  (): T;
}

interface IFuncUpdater<T> {
  (previousState?: T): T;
}

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

function getByKey<T>(
  storage: Storage,
  key: string,
  defaultValue?: T | IInitFunc<T>,
): T | undefined {
  const raw = storage.getItem(key);
  if (raw) {
    return JSON.parse(raw);
  }
  if (isFunction<IInitFunc<T>>(defaultValue)) {
    return defaultValue();
  }
  return defaultValue;
}

function useStorageState<T>(storage: Storage, key: string, defaultValue?: T | IInitFunc<T>) {
  const [state, setState] = useState<T | undefined>(() => getByKey(storage, key, defaultValue));

  function updateState(value?: T | IFuncUpdater<T>) {
    if (typeof value === 'undefined') {
      storage.removeItem(key);
      setState(defaultValue);
    } else if (isFunction<IFuncUpdater<T>>(value)) {
      const previousState = getByKey(storage, key, defaultValue);
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
