import { useRef, useState } from 'react';

import useCreation from '../useCreation';

const proxyMap = new WeakMap();

function observer<T extends object>(initialVal: T, cb: () => void) {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof (res === 'object' && res !== null) ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  return proxy;
}

function useReactive<S extends object>(initialState: S): S {
  const [, setFlag] = useState({});
  const stateRef = useRef<S>(initialState);

  const state = useCreation(() => {
    return observer(stateRef.current, () => {
      setFlag({});
    });
  }, []);

  return state;
}

export default useReactive;
