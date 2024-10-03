import { useCallback, useEffect, useMemo } from 'react';
import isBrowser from '../utils/isBrowser';
import type { Options as UseStorageStateOption } from '../createUseStorageState';
import { createUseStorageState } from '../createUseStorageState';
import dayjs from 'dayjs';
import useMemoizedFn from '../useMemoizedFn';

export type StorageType = 'localStorage' | 'sessionStorage';
export type ExpireTimeProp = 'createTime' | 'updateTime';

/** 单条记录的存储的数据类型 */
type UnitStorageState<T> = {
  subKey: Exclude<Options<T>['subKey'], undefined>;
  createTime: string;
  createTimeFormat: string;
  updateTime: string;
  updateTimeFormat: string;
  /** 用户数据 */
  data?: T;
};

export type SetUnitDataState<S> = S | ((prevState?: S) => S);

export interface Options<T> {
  /** 缓存类型 */
  storageType?: StorageType;
  /** 二级key。用于区分同个页面，不同用户的缓存 */
  subKey?: string;
  /** 过期时间 单位秒 s */
  expire?: number;
  /** 用于计算过期时间取值属性 */
  expireTimeProp?: ExpireTimeProp;
  /** 最大数量 */
  maxCount?: number;
  /** 缓存版本号 */
  version?: number | string;
  timeFormat?: string;
  useStorageStateOptions?: UseStorageStateOption<T>;
}

type StorageStateRecorder<T> = Record<string, Record<string, UnitStorageState<T>>>;

export default function <T>(key: string, options?: Options<T>) {
  useEffect(() => {
    if ([options?.version, options?.subKey].includes('default')) {
      console.warn(
        'do not use "default" as value of your version or subKey, these will cause you get random data!',
      );
    }
  }, [options?.version, options?.subKey]);
  const {
    version = 'default',
    subKey = 'default',
    maxCount = 100,
    // default storage six months
    expire = 1000 * 60 * 60 * 24 * 180,
    expireTimeProp = 'updateTime',
    timeFormat = 'YYYY-MM-DD HH:mm:ss',
    storageType = 'localStorage',
  } = options || {};

  const getRealityStorageKey = (
    storageKey: string,
    storageVersion: string | number = 'default',
    storageSubkey: string | number = 'default',
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

  const deleteStorageBySubKey = useMemoizedFn((deleteSubKey) => {
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
