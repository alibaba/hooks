import { useEffect } from 'react';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

/**
 * A hook that executes a function after the component is mounted.
 * @see https://ahooks.js.org/hooks/use-mount
 */
const useMount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
