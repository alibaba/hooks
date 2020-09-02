import { useState, useEffect, useRef } from 'react';

import { reactive, effect, stop } from '@vue/reactivity';
import useCreation from '../useCreation';
import debounceFunc from 'lodash.debounce';
import throttleFunc from 'lodash.throttle';

interface Options {
  debounce?: number; // 防抖
  throttle?: number; // 节流
}

let mapArrMethods = ['push', 'splice', 'shift', 'unshift', 'pop', 'sort', 'reverse'];

function _traversalObj<S extends object>(obj: S, cb) {
  if (typeof obj === 'object') {
    for (let key in obj) {
      if (typeof obj !== 'object') {
        continue;
      } else if (Array.isArray(obj[key])) {
        mapArrMethods.forEach((method) => {
          let pushTemp = (obj[key] as any)[method];
          obj[key][method] = function (...args) {
            cb();
            pushTemp.apply(this, args);
          };
        });
        continue;
      }
      _traversalObj(obj[key] as any, cb);
    }
  }
}

function useReactive<S extends object>(initialState: S, options: Options = {}): S {
  let { debounce = 0, throttle = 0 } = options;
  const [cueState, changeState] = useState<S>(initialState);
  let { current: isUmount } = useRef(false);

  let state = useCreation(() => reactive(cueState), []);

  let debounceFn = useCreation(
    () =>
      debounce &&
      debounceFunc(() => {
        !isUmount && changeState({ ...(state as S) });
      }, debounce),
    [],
  );

  let throttleFu = useCreation(
    () =>
      throttle &&
      throttleFunc(() => {
        !isUmount && changeState({ ...(state as S) });
      }, throttle),
    [],
  );

  useEffect(() => {
    let effectRef = effect(() => {
      if (isUmount) return;

      // add dependency
      _traversalObj(state, () => {
        changeState({ ...(state as S) });
      });

      if (debounceFn) {
        debounceFn();
        return;
      }

      if (throttleFu) {
        throttleFu();
        return;
      }

      changeState({ ...(state as S) });
    });

    return () => {
      stop(effectRef); // stop reactive
      isUmount = true;
    };
  }, []);

  return state as S;
}

export default useReactive;
