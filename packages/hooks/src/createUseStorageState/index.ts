/* eslint-disable no-empty */
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
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
}

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T>(key: string, options?: Options<T>) {
    const { serializer, deserializer, defaultValue } = options || {};

    let storage: Storage | undefined;

    // https://github.com/alibaba/hooks/issues/800
    try {
      storage = getStorage();
    } catch (err) {
      console.error(err);
    }

    const serializerFn = (value: T) => {
      if (serializer) {
        return serializer(value);
      }
      return JSON.stringify(value);
    };

    const deserializerFn = (value: string) => {
      if (deserializer) {
        return deserializer(value);
      }
      return JSON.parse(value);
    };

    function getStoredValue() {
      try {
        const raw = storage && storage.getItem(key);
        if (raw) {
          return deserializerFn(raw);
        }
      } catch (e) {
        console.error(e);
      }
      if (isFunction(defaultValue)) {
        return defaultValue();
      }
      return defaultValue;
    }

    const [state, setState] = useState<T | undefined>(() => getStoredValue());

    useUpdateEffect(() => {
      setState(getStoredValue());
    }, [key]);

    const updateState = (value?: T | IFuncUpdater<T>) => {
      if (isUndef(value)) {
        setState(undefined);
        storage && storage.removeItem(key);
      } else if (isFunction(value)) {
        const currentState = value(state);
        try {
          setState(currentState);
          storage && storage.setItem(key, serializerFn(currentState));
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          setState(value);
          storage && storage.setItem(key, serializerFn(value));
        } catch (e) {
          console.error(e);
        }
      }
    };

    return [state, useMemoizedFn(updateState)] as const;
  }
  return useStorageState;
}
