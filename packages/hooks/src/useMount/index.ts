import { useEffect } from 'react';
import { type EffectCallback } from 'react';
import { isFunction, isThenable } from '../utils';
import isDev from '../utils/isDev';

type MountCallback = EffectCallback | (() => Promise<void | (() => void)>);

const useMount = (fn: MountCallback) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  useEffect(() => {
    const result = fn?.();
    // If fn returns a Promise, don't return it as cleanup function
    if (isThenable(result)) {
      return;
    }
    return result;
  }, []);
};

export default useMount;
