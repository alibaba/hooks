import { useRef, useState } from "react";
import useEventListener from "../useEventListener";
import useMemoizedFn from "../useMemoizedFn";
import useUpdateEffect from "../useUpdateEffect";
import { isFunction, isUndef } from "../utils";

export const SYNC_STORAGE_EVENT_NAME = "AHOOKS_SYNC_STORAGE_EVENT_NAME";

export type SetState<S> = S | ((prevState?: S) => S);

export interface Options<T> {
  defaultValue?: T | (() => T);
  listenStorageChange?: boolean;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
}

export const createUseStorageState = (
  getStorage: () => Storage | undefined
) => {
  const useStorageState = <T>(key: string, options: Options<T> = {}) => {
    let storage: Storage | undefined;

    const { listenStorageChange = false } = options;

    const serializer = isFunction(options.serializer)
      ? options.serializer
      : JSON.stringify;

    const deserializer = isFunction(options.deserializer)
      ? options.deserializer
      : JSON.parse;

    const onError = isFunction(options.onError)
      ? options.onError
      : console.error;

    // https://github.com/alibaba/hooks/issues/800
    try {
      storage = getStorage();
    } catch (err) {
      onError(err);
    }

    const getStoredValue = () => {
      try {
        const raw = storage?.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        onError(e);
      }
      if (isFunction(options.defaultValue)) {
        return options.defaultValue();
      }
      return options.defaultValue;
    };

    const [state, setState] = useState<T>(getStoredValue);

    const stateRef = useRef<T>(state);
    stateRef.current = state;

    useUpdateEffect(() => {
      const nextState = getStoredValue();
      if (Object.is(nextState, stateRef.current)) {
        return; // 新旧状态相同，不更新 state，避免 setState 带来不必要的 re-render
      }
      stateRef.current = nextState;
      setState(nextState);
    }, [key]);

    const updateState = (value: SetState<T>) => {
      const previousState = stateRef.current;
      const currentState = isFunction(value) ? value(previousState) : value;

      if (Object.is(currentState, previousState)) {
        return; // 新旧状态相同，不更新 state，避免 setState 带来不必要的 re-render
      }

      if (!listenStorageChange) {
        stateRef.current = currentState;
        setState(currentState);
      }

      try {
        let newValue: string | null;
        const oldValue = storage?.getItem(key);

        if (isUndef(currentState)) {
          newValue = null;
          storage?.removeItem(key);
        } else {
          newValue = serializer(currentState);
          storage?.setItem(key, newValue);
        }

        dispatchEvent(
          // send custom event to communicate within same page
          // importantly this should not be a StorageEvent since those cannot
          // be constructed with a non-built-in storage area
          new CustomEvent(SYNC_STORAGE_EVENT_NAME, {
            detail: {
              key,
              newValue,
              oldValue,
              storageArea: storage,
            },
          })
        );
      } catch (e) {
        onError(e);
      }
    };

    const syncState = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== storage) {
        return;
      }

      const nextState = getStoredValue();

      if (Object.is(nextState, stateRef.current)) {
        return; // 新旧状态相同，不更新 state，避免 setState 带来不必要的 re-render
      }

      stateRef.current = nextState;
      setState(nextState);
    };

    const syncStateFromCustomEvent = (event: CustomEvent<StorageEvent>) => {
      syncState(event.detail);
    };

    // from another document
    useEventListener("storage", syncState, {
      enable: listenStorageChange,
    });

    // from the same document but different hooks
    useEventListener(SYNC_STORAGE_EVENT_NAME, syncStateFromCustomEvent, {
      enable: listenStorageChange,
    });

    return [state, useMemoizedFn(updateState)] as const;
  };

  return useStorageState;
};
