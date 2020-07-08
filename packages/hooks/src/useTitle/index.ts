import { useEffect, useRef } from 'react';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

export default function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (options && options.restoreOnUnmount) {
        document.title = titleRef.current;
      }
    };
  }, []);
}
