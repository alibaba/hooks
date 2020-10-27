import { useRef, useState } from 'react';

import useCreation from '../useCreation';

function observer<T extends object>(initialVal: T, cb: () => void) {
  return new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object' ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
  });
}

function useReactive<S extends object>(initialState: S): S {
  const [, setFlag] = useState({});
  const stateRef = useRef<S>(initialState);

  let state = useCreation(() => {
    return observer(stateRef.current, () => {
      setFlag({});
    });
  }, []);

  return state;
}

export default useReactive;
