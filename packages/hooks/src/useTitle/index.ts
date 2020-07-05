import { useEffect, useRef } from 'react';

export interface Options {
  retainOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  retainOnUnmount: false,
};

export default function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (options && !options.retainOnUnmount) {
        document.title = titleRef.current;
      }
    };
  }, []);
}
