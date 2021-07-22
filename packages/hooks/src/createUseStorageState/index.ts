/* eslint-disable no-empty */
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useUpdateEffect from '../useUpdateEffect';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}
export interface IFuncStorage {
  (): Storage;
}

export interface Options<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export interface OptionsWithDefaultValue<T> extends Options<T> {
  defaultValue: T | IFuncUpdater<T>;
}

export type StorageStateResult<T> = [T | undefined, (value?: T | IFuncUpdater<T>) => void];
export type StorageStateResultHasDefaultValue<T> = [T, (value?: T | IFuncUpdater<T>) => void];

function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T = any>(key: string, options?: Options<T>): StorageStateResult<T>;
  function useStorageState<T>(
    key: string,
    options: OptionsWithDefaultValue<T>,
  ): StorageStateResultHasDefaultValue<T>;

  function useStorageState<T>(key: string, options?: Options<T> & OptionsWithDefaultValue<T>) {
    let storage: Storage | undefined;

    // https://github.com/alibaba/hooks/issues/800
    try {
      storage = getStorage();
    } catch {}

    const serializer = (value: T) => {
      if (options?.serializer) {
        return options?.serializer(value);
      }
      try {
        return JSON.stringify(value);
      } catch {
        return '';
      }
    };

    const deserializer = (value: string) => {
      if (options?.deserializer) {
        return options?.deserializer(value);
      }
      try {
        return JSON.parse(value);
      } catch {
        return '';
      }
    };

    function getStoredValue() {
      const raw = storage?.getItem(key);
      if (raw) {
        return deserializer(raw);
      }
      if (isFunction<IFuncUpdater<T>>(options?.defaultValue)) {
        return options?.defaultValue();
      }
      return options?.defaultValue;
    }

    const [state, setState] = useState<T | undefined>(() => getStoredValue());
    useUpdateEffect(() => {
      setState(getStoredValue());
    }, [key]);

    const updateState = (value?: T | IFuncUpdater<T>) => {
      if (typeof value === 'undefined') {
        setState(undefined);
        storage?.removeItem(key);
      } else if (isFunction<IFuncUpdater<T>>(value)) {
        const currentState = value(state);
        setState(currentState);
        storage?.setItem(key, serializer(currentState));
      } else {
        setState(value);
        storage?.setItem(key, serializer(value));
      }
    };

    return [state, useMemoizedFn(updateState)];
  }
  return useStorageState;
}
