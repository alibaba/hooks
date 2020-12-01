import { useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import usePersistFn from '../usePersistFn';

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

const isWindow = typeof window === 'object';

function useStorageState<T>(
  storage: Storage | IFuncStorage,
  key: string,
  defaultValue?: StorageStateDefaultValue<T>,
): StorageStateResult<T> {
  const getStoredValue = usePersistFn(() => {
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
  });

  const [state, setState] = useState<T | undefined>(() => {
    if (!isWindow) {
      return isFunction<IFuncUpdater<T>>(defaultValue) ? defaultValue() : defaultValue;
    }
    return getStoredValue();
  });
  useUpdateEffect(() => {
    setState(getStoredValue());
  }, [key]);

  const updateState = usePersistFn(
    !isWindow
      ? () => {}
      : (value?: T | IFuncUpdater<T>) => {
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
  );

  return [state, updateState];
}

export default useStorageState;
