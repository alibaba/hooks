import { useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}

export interface IFuncStorage {
  (): Storage;
}

export type StorageStateDefaultValue<T> = T | IFuncUpdater<T>;

export type StorageStateResult<T> = [T | undefined, (value: StorageStateDefaultValue<T>) => void];

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

function useStorageState<T>(
  storage: Storage | IFuncStorage,
  key: string,
  defaultValue?: StorageStateDefaultValue<T>,
): StorageStateResult<T> {
  if (typeof window !== 'object') {
    return [isFunction<IFuncUpdater<T>>(defaultValue) ? defaultValue() : defaultValue, () => {}];
  }

  const getStoredValue = useCallback(() => {
    if (isFunction<IFuncStorage>(storage)) {
      storage = storage();
    }
    const raw = storage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    if (isFunction<IFuncUpdater<T>>(defaultValue)) {
      return defaultValue();
    }
    return defaultValue;
  }, [storage, defaultValue, key]);

  const [state, setState] = useState<T | undefined>(() => getStoredValue());
  useUpdateEffect(() => {
    setState(getStoredValue());
  }, [key]);

  const updateState = useCallback(
    (value?: T | IFuncUpdater<T>) => {
      if (isFunction<IFuncStorage>(storage)) {
        storage = storage();
      }
      if (typeof value === 'undefined') {
        storage.removeItem(key);
        setState(undefined);
      } else if (isFunction<IFuncUpdater<T>>(value)) {
        const previousState = getStoredValue();
        const currentState = value(previousState);
        storage.setItem(key, JSON.stringify(currentState));
        setState(currentState);
      } else {
        storage.setItem(key, JSON.stringify(value));
        setState(value);
      }
    },
    [storage, key, getStoredValue],
  );

  return [state, updateState];
}

export default useStorageState;
