import { useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}
export interface IFuncStorage {
  (): Storage;
}

export type StorageStateResult<T> = [T | undefined, (value?: T | IFuncUpdater<T>) => void];
export type StorageStateResultHasDefaultValue<T> = [T, (value?: T | IFuncUpdater<T>) => void];

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

export function createUseStorageState(nullishStorage: Storage | null) {
  function useStorageState<T = undefined>(key: string): StorageStateResult<T>;
  function useStorageState<T>(
    key: string,
    defaultValue: T | IFuncUpdater<T>,
  ): StorageStateResultHasDefaultValue<T>;

  function useStorageState<T>(key: string, defaultValue?: T | IFuncUpdater<T>) {
    const storage = nullishStorage as Storage;
    const [state, setState] = useState<T | undefined>(() => getStoredValue());
    useUpdateEffect(() => {
      setState(getStoredValue());
    }, [key]);

    function getStoredValue() {
      try {
        const raw = storage.getItem(key);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch (e) {
        console.error(e);
      }
      if (isFunction<IFuncUpdater<T>>(defaultValue)) {
        return defaultValue();
      }
      return defaultValue;
    }

    const updateState = useCallback(
      (value?: T | IFuncUpdater<T>) => {
        if (typeof value === 'undefined') {
          storage.removeItem(key);
          setState(undefined);
        } else if (isFunction<IFuncUpdater<T>>(value)) {
          const previousState = getStoredValue();
          const currentState = value(previousState);
          try {
            storage.setItem(key, JSON.stringify(currentState));
            setState(currentState);
          } catch (e) {
            console.error(e);
          }
        } else {
          try {
            storage.setItem(key, JSON.stringify(value));
            setState(value);
          } catch (e) {
            console.error(e);
          }
        }
      },
      [key],
    );

    return [state, updateState];
  }
  if (!nullishStorage) {
    return function (_: string, defaultValue: any) {
      return [
        isFunction<IFuncUpdater<any>>(defaultValue) ? defaultValue() : defaultValue,
        () => {},
      ];
    } as typeof useStorageState;
  }
  return useStorageState;
}
