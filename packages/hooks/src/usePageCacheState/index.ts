import type { SetStateAction } from 'react';
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

interface Options<T> {
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
    timeFormat = 'YYYY-MM-DD HH-mm-ss',
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
  useEffect(() => {
    const curTime = dayjs(new Date()).format(timeFormat);
    const curKeyStorageRecorder = pageCacheKeysRecorder?.[key];
    // ================ calculate current key's storage's count ================
    let curStoragedCount = 0;
    Object.keys(curKeyStorageRecorder || {}).forEach((subKeyItem) => {
      Object.keys(curKeyStorageRecorder?.[subKeyItem] || {})?.forEach((versionItem) => {
        const curStorageRecorder = curKeyStorageRecorder?.[subKeyItem][
          versionItem
        ] as UnitStorageState<T>;

        // remove expired storage
        if (dayjs(curTime).diff(curStorageRecorder[expireTimeProp]) > expire * 1000) {
          getStorage()?.removeItem(getRealityStorageKey(key, subKeyItem, versionItem));
        } else {
          curStoragedCount++;
        }
      });
    });

    // remove the other vesrion or subkey when reach to max count.
    if (curStoragedCount > maxCount) {
      const versionKeys = Object.keys(curKeyStorageRecorder?.[subKey] || {});

      if (versionKeys.length > 0) {
        getStorage()?.removeItem(getRealityStorageKey(key, subKey, versionKeys[0]));
      } else {
        const subKeys = Object.keys(curKeyStorageRecorder || {});

        if (subKeys.length > 0) {
          const removeVersionKeys = Object.keys(curKeyStorageRecorder?.[subKeys[0]] || {});

          if (removeVersionKeys.length) {
            getStorage()?.removeItem(getRealityStorageKey(key, subKeys[0], removeVersionKeys[0]));
          }
        }
      }
    }

    const handlePreKeyRecorder = (preKeyRecorder: any) => {
      const finalDataStateRecord: UnitStorageState<T> = {
        ...curKeyStorageRecorder?.[subKey]?.[version],
        ...(curKeyStorageRecorder?.[subKey]?.[version]
          ? {}
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
      const newPageCacheKeysRecorder = {
        [key]: {},
      };

      handlePreKeyRecorder(newPageCacheKeysRecorder);

      setPageCacheKeysRecorder(newPageCacheKeysRecorder);
    } else {
      const newPageCacheKeysRecorder = {
        ...pageCacheKeysRecorder,
      };

      handlePreKeyRecorder(newPageCacheKeysRecorder);

      setPageCacheKeysRecorder(newPageCacheKeysRecorder);
    }
  }, [pageCache]);

  const deleteStorageBySubKey = useMemoizedFn((deleteSubKey) => {
    setPageCache(undefined);

    // ===================== find all keys and remove =====================
    const curSubKeyStorageRecorder = pageCacheKeysRecorder?.[key]?.[deleteSubKey] || {};
    const versionKeys = Object.keys(curSubKeyStorageRecorder);

    versionKeys.forEach((versionItem) => {
      getStorage()?.removeItem(getRealityStorageKey(key, deleteSubKey, versionItem));
    });
  });

  return [
    pageCache,
    setPageCache,
    {
      delete: deleteStorageBySubKey,
      storageStateRecorder: pageCacheKeysRecorder,
      setStorageStateRecorder: setPageCacheKeysRecorder,
    },
  ] as const;
}
