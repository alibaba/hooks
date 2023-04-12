/* eslint-disable no-empty */
import { useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import { isFunction, isUndef } from '../utils';

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}
export interface IFuncStorage {
  (): Storage;
}

export interface Options<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  defaultValue?: T | IFuncUpdater<T>;
  onError?: (error: unknown) => void;
}

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T>(key: string, options: Options<T> = {}) {
    let storage: Storage | undefined;
    const {
      onError = (e) => {
        console.error(e);
      },
    } = options;

    // https://github.com/alibaba/hooks/issues/800
    try {
      storage = getStorage();
    } catch (err) {
      onError(err);
    }

    const serializer = (value: T) => {
      if (options?.serializer) {
        return options?.serializer(value);
      }
      return JSON.stringify(value);
    };

    const deserializer = (value: string) => {
      if (options?.deserializer) {
        return options?.deserializer(value);
      }
      return JSON.parse(value);
    };

    function getStoredValue() {
      try {
        const raw = storage?.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        onError(e);
      }
      if (isFunction(options?.defaultValue)) {
        return options?.defaultValue();
      }
      return options?.defaultValue;
    }

    const [state, setState] = useState<T>(() => getStoredValue());

    useUpdateEffect(() => {
      setState(getStoredValue());
    }, [key]);

    useUpdateEffect(() => {
      if (isUndef(state)) {
        storage?.removeItem(key);
      } else {
        try {
          storage?.setItem(key, serializer(state));
        } catch (e) {
          console.error(e);
        }
      }
    }, [state]);

    return [state, setState] as const;
  }
  return useStorageState;
}
