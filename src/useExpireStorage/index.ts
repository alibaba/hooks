import { useState, useCallback, useMemo } from 'react';

type IType = 'localStorage' | 'sessionStorage' | undefined;

function useExpireStorage<T>(key: string, defaultValue?: T, type: IType = 'localStorage') {
  const privateKey: string = `private_storage_key_${key}`;
  const storage: Storage = window[type];
  const [state, setState] = useState(defaultValue);

  /**
   * 设置键值
   * @param [any] val 值
   * @param [number = 0] maxAge 存储时间：s | ms
   */
  const setValue = useCallback((val: T, maxAge: number = 0) => {
    // 设置持续时间小于10的自动转化
    const duration = maxAge < 10 ? maxAge * 1000 : maxAge;
    // 返回有效期
    const expires = maxAge === 0 ? 0 : Date.now() + duration;
    const data = {
      val,
      expires,
    };
    storage[privateKey] = JSON.stringify(data);
    setState(val);
  }, []);

  // 移除键值
  const remove = useCallback(() => {
    delete storage[privateKey];
    setState(defaultValue);
  }, []);

  // 返回当前存储的值
  const value: T = useMemo(() => {
    // 防止首次取不到值出现的错误
    const data = storage[privateKey] && JSON.parse(storage[privateKey]);
    if (!data) {
      return state;
    }

    // 不设定期限或者处于有效期内
    if (data.expires === 0 || Date.now() < data.expires) {
      return data.val;
    }

    // 移除键值，防止超期缓存
    remove();
    return state;
  }, [state]);

  return {
    value,
    setValue,
    remove,
  };
}

export default useExpireStorage;
