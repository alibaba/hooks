import { useRef } from 'react';
import { cloneDeepWith, isPlainObject } from 'lodash';
import useCreation from '../useCreation';
import useUpdate from '../useUpdate';

// k:v 原对象:代理过的对象
const proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
const rawMap = new WeakMap();

function observer<T extends Record<string, any>>(initialVal: T, cb: () => void): T {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }

  // 防止代理已经代理过的对象
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      // Only proxy plain object (e.g. `{}`, `Object.create(null)`, ...),
      // otherwise it will cause: https://github.com/alibaba/hooks/issues/2080
      return isPlainObject(res) ? observer(res, cb) : res;
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);

  return proxy;
}

function deepClone<S>(initialState: S): S {
  // resolve: https://github.com/alibaba/hooks/issues/1317
  const copy = cloneDeepWith(initialState, (value) => {
    const ret = {};

    for (const key of Reflect.ownKeys(value)) {
      ret[key] = Reflect.get(value, key);
    }

    return ret;
  });

  return copy;
}

function useReactive<S extends Record<string, any>>(initialState: S): S {
  const update = useUpdate();
  const stateRef = useRef<S>();

  const state = useCreation(() => {
    stateRef.current = deepClone<S>(initialState);

    return observer(stateRef.current, () => {
      update();
    });
  }, []);

  return state;
}

export default useReactive;
