import type { SetStateAction } from 'react';
import { useEffect, useMemo } from 'react';
import isBrowser from '../utils/isBrowser';
import type { Options as UseStorageStateOption } from '../createUseStorageState';
import { createUseStorageState } from '../createUseStorageState';

export type StorageType = 'localStorage' | 'sessionStorage';
export type ExpireTimeProp = 'createTime' | 'updateTime';

/** 单条记录的存储的数据类型 */
type UnitStorageState<T> = {
  subKey: Exclude<Options<T>['subKey'], undefined>;
  createTime: number;
  createTimeFormat: string;
  updateTime: number;
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
  useStorageStateOptions?: UseStorageStateOption<T>;
}

export default function <T>(
  key: string,
  options?: Options<T>,
): [
  unitData: T | undefined,
  (unitData: SetUnitDataState<T>) => void,
  {
    delete: (subKey?: string | undefined) => void;
    storageState: UnitStorageState<T>[] | undefined;
    setStorageState: (
      value?: UnitStorageState<T>[] | SetStateAction<UnitStorageState<T>[] | undefined> | undefined,
    ) => void;
  },
] {
  useEffect(() => {
    if ([options?.version, options?.subKey].includes('default')) {
      console.warn(
        'do not use "default" as value of your version or subKey, these will cause you get random data!',
      );
    }
  }, [options?.version, options?.subKey]);
  const { version = 'default', subKey = 'default' } = options || {};
  const storageKey = useMemo(() => {
    const valueStrTransfer = (value) => {
      return value ? `_${value}` : '';
    };

    return `${key}${valueStrTransfer(options?.version)}${valueStrTransfer(options?.subKey)}`;
  }, [key, options?.version, options?.subKey]);

  const useStorageState = createUseStorageState(() => {
    if (isBrowser) {
      if (options?.storageType === 'sessionStorage') {
        return sessionStorage;
      } else if (options?.storageType === 'localStorage') {
        return localStorage;
      }
    }
    return undefined;
  });
  const [pageCacheKeysRecorder, setPageCacheKeysRecorder] = useStorageState(
    `${key}_all_keys_recorder`,
    {},
  );

  useEffect(() => {
    const handlePreKeyRecorder = (preKeyRecorder: any) => {
      if (preKeyRecorder) {
        if (preKeyRecorder[subKey]) {
          preKeyRecorder[subKey][version] = {};
        } else {
          preKeyRecorder[subKey] = { [version]: {} };
        }
      }
    };

    if (!pageCacheKeysRecorder?.[key]) {
      const newPageCacheKeysRecorder = {
        [key]: {},
      };

      handlePreKeyRecorder(newPageCacheKeysRecorder);

      setPageCacheKeysRecorder(newPageCacheKeysRecorder);
    } else {
      const newPageCacheKeysRecorder = {
        ...pageCacheKeysRecorder[key],
      };

      handlePreKeyRecorder(newPageCacheKeysRecorder);

      setPageCacheKeysRecorder(newPageCacheKeysRecorder);
    }
  }, []);

  const [pageCache, setPageCache] = useStorageState(storageKey, options?.useStorageStateOptions);

  return [];
}
