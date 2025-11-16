import { useEffect } from 'react';
import { type EffectCallback } from 'react';
import { isFunction } from '../utils';
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
    if (result && typeof result === 'object' && typeof (result as any).then === 'function') {
      return;
    }
    return result as ReturnType<EffectCallback>;
  }, []);
};

export default useMount;
