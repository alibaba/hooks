import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = titleRef.current;
      };
    }
  }, []);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
