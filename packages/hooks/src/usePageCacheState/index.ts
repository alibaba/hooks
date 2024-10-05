import { useCallback, useEffect, useMemo } from 'react';
import isBrowser from '../utils/isBrowser';
import type { Options as UseStorageStateOption } from '../createUseStorageState';
import { createUseStorageState } from '../createUseStorageState';
import dayjs from 'dayjs';
import useMemoizedFn from '../useMemoizedFn';

const DEFAULT_VALUE = 'default';

export type StorageType = 'localStorage' | 'sessionStorage';
export type ExpireTimeProp = 'createTime' | 'updateTime';

/** Data type for storing a single record */
type UnitStorageState<T> = {
  subKey: Exclude<Options<T>['subKey'], undefined>;
  createTime: string;
  createTimeFormat: string;
  updateTime: string;
  updateTimeFormat: string;
  /** User data */
  data?: T;
};

export type SetUnitDataState<S> = S | ((prevState?: S) => S);

export interface Options<T> {
  /** Cache type */
  storageType?: StorageType;
  /** Secondary key. Used to differentiate cache between different users on the same page */
  subKey?: string;
  /** Expiration time in seconds */
  expire?: number;
  /** Property used to calculate expiration time */
  expireTimeProp?: ExpireTimeProp;
  /** Maximum count */
  maxCount?: number;
  /** Cache version number */
  version?: number | string;
  timeFormat?: string;
  useStorageStateOptions?: UseStorageStateOption<T>;
}

type StorageStateRecorder<T> = Record<string, Record<string, UnitStorageState<T>>>;

export default function <T>(key: string, options?: Options<T>) {
  useEffect(() => {
    if ([options?.version, options?.subKey].includes(DEFAULT_VALUE)) {
      console.warn(
        'do not use "default" as value of your version or subKey, these will cause you get random data!',
      );
    }
  }, [options?.version, options?.subKey]);
  const {
    version = DEFAULT_VALUE,
    subKey = DEFAULT_VALUE,
    maxCount = 100,
    // default storage six months
    expire = 1000 * 60 * 60 * 24 * 180,
    expireTimeProp = 'updateTime',
    timeFormat = 'YYYY-MM-DD HH:mm:ss',
    storageType = 'localStorage',
  } = options || {};

  const getRealityStorageKey = (
    storageKey: string,
    storageVersion: string | number = DEFAULT_VALUE,
    storageSubkey: string | number = DEFAULT_VALUE,
  ) => {
    const valueStrTransfer = (value) => {
      return `_${value}`;
    };

    return `${storageKey}${valueStrTransfer(storageVersion)}${valueStrTransfer(storageSubkey)}`;
  };
  const storageKey = useMemo(
    () => getRealityStorageKey(key, version, subKey),
    [key, version, subKey],
  );
  const getStorage = useCallback(() => {
    if (isBrowser) {
      if (storageType === 'sessionStorage') {
        return sessionStorage;
      } else if (storageType === 'localStorage') {
        return localStorage;
      }
    }
    return undefined;
  }, []);
  const useStorageState = createUseStorageState(getStorage);

  const [pageCache, setPageCache] = useStorageState(storageKey, options?.useStorageStateOptions);

  // ============================= hanlde recorder =============================
  const [pageCacheKeysRecorder, setPageCacheKeysRecorder] = useStorageState<
    StorageStateRecorder<T>
  >(`${key}_all_keys_recorder`, {});

  // remove data when expired or over count
  useEffect(() => {
    const curTime = dayjs(new Date()).format(timeFormat);
    const curKeyStorageRecorder = pageCacheKeysRecorder;
    // ================ calculate current key's storage's count ================
    let curStoragedCount = 0;
    Object.keys(curKeyStorageRecorder || {}).forEach((subKeyItem) => {
      Object.keys(curKeyStorageRecorder?.[subKeyItem] || {})?.forEach((versionItem) => {
        const curStorageRecorder = curKeyStorageRecorder?.[subKeyItem]?.[
          versionItem
        ] as UnitStorageState<T>;

        // remove expired storage
        if (
          !curStorageRecorder ||
          dayjs(curTime).diff(dayjs(curStorageRecorder[expireTimeProp])) > expire * 1000
        ) {
          // set default value when data is cleared
          if (subKeyItem === subKey && versionItem === version) {
            setPageCache(options?.useStorageStateOptions?.defaultValue);
            return;
          }

          getStorage()?.removeItem(getRealityStorageKey(key, versionItem, subKeyItem));
        } else {
          curStoragedCount++;
        }
      });
    });

    // remove the other vesrion or subkey when reach to max count.
    if (curStoragedCount > maxCount) {
      const versionKeys = Object.keys(curKeyStorageRecorder?.[subKey] || {});

      if (versionKeys.length > 1) {
        getStorage()?.removeItem(getRealityStorageKey(key, versionKeys[0], subKey));
      } else {
        const subKeys = Object.keys(curKeyStorageRecorder || {});

        if (subKeys.length > 0) {
          const removeVersionKeys = Object.keys(curKeyStorageRecorder?.[subKeys[0]] || {});

          if (removeVersionKeys.length) {
            getStorage()?.removeItem(getRealityStorageKey(key, removeVersionKeys[0], subKeys[0]));
          }
        }
      }
    }
  }, [pageCacheKeysRecorder]);

  // update recorder
  useEffect(() => {
    const curKeyStorageRecorder = pageCacheKeysRecorder;
    const curTime = dayjs(new Date()).format(timeFormat);

    const handlePreKeyRecorder = (preKeyRecorder: any) => {
      const preUnitStorageState = curKeyStorageRecorder?.[subKey]?.[version];
      const finalDataStateRecord: UnitStorageState<T> = {
        ...(preUnitStorageState
          ? preUnitStorageState
          : {
              createTime: curTime,
              createTimeFormat: timeFormat,
            }),
        updateTime: curTime,
        updateTimeFormat: timeFormat,
        subKey,
        data: pageCache,
      };

      if (preKeyRecorder) {
        if (preKeyRecorder[subKey]) {
          preKeyRecorder[subKey][version] = finalDataStateRecord;
        } else {
          preKeyRecorder[subKey] = { [version]: finalDataStateRecord };
        }
      }
    };

    if (!curKeyStorageRecorder) {
      const newPageCacheKeysRecorder = {};

      handlePreKeyRecorder(newPageCacheKeysRecorder);

      setPageCacheKeysRecorder(newPageCacheKeysRecorder);
    } else {
      const newPageCacheKeysRecorder = {
        ...curKeyStorageRecorder,
      };

      handlePreKeyRecorder(newPageCacheKeysRecorder);

      setPageCacheKeysRecorder(newPageCacheKeysRecorder);
    }
  }, [pageCache, storageKey, subKey, maxCount, expire, expireTimeProp, timeFormat, storageType]);

  const deleteStorageBySubKey = useMemoizedFn((deleteSubKey = DEFAULT_VALUE) => {
    setPageCache(undefined);

    // ===================== find all keys and remove =====================
    const curSubKeyStorageRecorder = pageCacheKeysRecorder?.[key]?.[deleteSubKey] || {};
    const versionKeys = Object.keys(curSubKeyStorageRecorder);

    versionKeys.forEach((versionItem) => {
      getStorage()?.removeItem(getRealityStorageKey(key, versionItem, deleteSubKey));
    });
  });

  return [
    pageCache,
    setPageCache,
    {
      delete: deleteStorageBySubKey,
      storageStateRecorder: pageCacheKeysRecorder,
      setStorageStateRecorder: setPageCacheKeysRecorder,
      getRealityStorageKey,
    },
  ] as const;
}
