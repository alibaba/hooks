import { useState } from 'react';

import useCreation from '../useCreation';

function observer(initialVal, cb) {
  return new Proxy(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object' ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      cb();
      return Reflect.set(target, key, val);
    },
  });
}

function useReactive<S extends object>(initialState: S): S {
  const [observerState, setObserverState] = useState<S>(initialState);

  let state = useCreation(() => {
    return observer(observerState, () => {
      setObserverState({ ...observerState });
    });
  }, []);

  return state;
}

export default useReactive;
