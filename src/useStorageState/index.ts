import { useState } from 'react';

/**
 * 定义参数
 */
interface IFuncUpdater<T> {
  (previousState?: T): T;
}

// 验证是不是Function
function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function';
}

// 定义useStorageState
/**
 *
 * @param storage : 缓存类型localStorage， SessionStorage;
 * @param key: 对应的key
 * @param defaultValue： 设置对应的值
 */
function useStorageState<T>(storage: Storage, key: string, defaultValue?: T | IFuncUpdater<T>) {
  // 定义state
  const [state, setState] = useState<T | undefined>(() => getStoredValue());

  // 获取StoredValue
  function getStoredValue() {
    const raw = storage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
    // 验证defaultValue是够为Function
    if (isFunction<IFuncUpdater<T>>(defaultValue)) {
      // 执行defaultValue();
      return defaultValue();
    }
    // 直接返回
    return defaultValue;
  }

  /**
   * updateState： 更新值
   * @param value：传入值
   */
  function updateState(value?: T | IFuncUpdater<T>) {
    // 如果value为'undefined'： typeof value === 'undefined';
    if (typeof value === 'undefined') {
      // 移除key对象
      storage.removeItem(key);
      // 设置初始值
      setState(defaultValue);
      // 判断value是否为Function
    } else if (isFunction<IFuncUpdater<T>>(value)) {
      // 获取previousState = getStoreValue();
      const previousState = getStoredValue();

      // 获取currentState
      const currentState = value(previousState);

      // 设置对应值
      storage.setItem(key, JSON.stringify(currentState));

      // 设置当前值
      setState(currentState);
    } else {
      // 设置对应的值
      storage.setItem(key, JSON.stringify(value));
      // 设置对应的值
      setState(value);
    }
  }
  // 返回state； updateState
  return [state, updateState];
}

export default useStorageState;
