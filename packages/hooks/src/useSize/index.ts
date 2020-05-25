import { useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Target = HTMLElement | React.RefObject<HTMLElement>;

type Size = { width?: number; height?: number };

function useSize(target: Target): Size {
  const [state, setState] = useState<Size>(() => {
    // @ts-ignore
    const targetElement = target.current ? target.current : target;
    return {
      width: (targetElement || {}).clientWidth,
      height: (targetElement || {}).clientHeight,
    };
  });

  useLayoutEffect(() => {
    // @ts-ignore
    const targetElement = target.current ? target.current : target;
    if (!targetElement) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(targetElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [target]);


  return state;
}

export default useSize;
