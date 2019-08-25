import { useLayoutEffect, useRef } from 'react';

const useScrollToTop = (location?: string) => {
  useLayoutEffect(
    () => {
      window.scrollTo(0, 0);
    },
    location ? [location] : [],
  );
};

export default useScrollToTop;
