import { useEffect, useRef } from 'react';
import useUnmount from '../useUnmount';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(document.title);
  useEffect(() => {
    document.title = title;
  }, [title]);

  useUnmount(() => {
    if (options && options.restoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}

export default typeof document !== 'undefined' ? useTitle : () => {};
