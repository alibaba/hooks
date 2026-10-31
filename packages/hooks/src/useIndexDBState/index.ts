import { useState, useRef, useEffect, useCallback } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isFunction } from '../utils';
import isBrowser from '../utils/isBrowser';

export type SetState<S> = S | ((prevState?: S) => S);

export interface Options<T> {
  defaultValue?: T | (() => T);
  dbName?: string;
  storeName?: string;
  version?: number;
  onError?: (error: unknown) => void;
}

function useIndexDBState<T>(key: string, options: Options<T> = {}) {
  const {
    defaultValue,
    dbName = 'ahooks-indexdb',
    storeName = 'ahooks-store',
    version = 1,
    onError = (e) => {
      console.error(e);
    },
  } = options;

  const [state, setState] = useState<T | undefined>(() => {
    if (isFunction(defaultValue)) {
      return defaultValue();
    }
    return defaultValue;
  });

  const dbRef = useRef<IDBDatabase | null>(null);
  const initialized = useRef<boolean>(false);

  // 从 IndexDB 获取数据
  const getValueFromDB = async (k: string): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        resolve(undefined);
        return;
      }

      try {
        const transaction = dbRef.current.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(k);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          onError(event);
          reject(event);
        };
      } catch (error) {
        onError(error);
        reject(error);
      }
    });
  };

  // 更新 IndexDB 中的数据
  const updateValueInDB = async (k: string, value: T | undefined) => {
    return new Promise<void>((resolve, reject) => {
      if (!dbRef.current) {
        reject(new Error('Database not initialized'));
        return;
      }

      try {
        const transaction = dbRef.current.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        let request;

        if (value === undefined) {
          request = store.delete(k);
        } else {
          request = store.put(value, k);
        }

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          onError(event);
          reject(event);
        };
      } catch (error) {
        onError(error);
        reject(error);
      }
    });
  };

  // 初始化 IndexDB
  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const initDB = () => {
      const request = window.indexedDB.open(dbName, version);

      request.onerror = (event) => {
        onError(event);
      };

      request.onsuccess = (event) => {
        dbRef.current = (event.target as IDBOpenDBRequest).result;
        // 初始化完成后，尝试获取数据
        getValueFromDB(key).then((value) => {
          if (value !== undefined) {
            setState(value);
          }
          initialized.current = true;
        });
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
    };

    if (typeof window !== 'undefined' && window.indexedDB) {
      initDB();
    } else {
      onError(new Error('IndexedDB is not supported in this environment'));
    }

    return () => {
      if (dbRef.current) {
        dbRef.current.close();
        dbRef.current = null;
      }
    };
  }, [dbName, storeName, version, key, onError]);

  // 更新状态
  const updateState = useCallback((value?: SetState<T>) => {
    const currentState = isFunction(value) ? value(state) : value;
    setState(currentState);

    if (initialized.current && isBrowser) {
      updateValueInDB(key, currentState).catch(onError);
    }
  }, [state, key, onError]);

  return [state, useMemoizedFn(updateState)] as const;
}

export default useIndexDBState; 