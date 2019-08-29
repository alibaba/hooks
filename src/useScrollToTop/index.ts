import { RefObject, useLayoutEffect, useRef } from 'react';

interface Options {
  location?: string;
  behavior?: 'auto' | 'smooth';
  ref?: RefObject<HTMLElement>;
  offset?: number;
}

const useScrollToTop = (options: Options = {}) => {
  const { location, behavior, ref, offset = 0 } = options;
  useLayoutEffect(
    () => {
      let top = offset;
      if (ref && ref.current) {
        top += ref.current.getBoundingClientRect().top + window.scrollY;
      }
      window.scrollTo({
        left: 0,
        top,
        behavior,
      });
    },
    location ? [location] : [],
  );
};

export default useScrollToTop;
