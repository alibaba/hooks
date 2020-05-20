import { useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Arg = HTMLElement | React.RefObject<HTMLInputElement>;

type Size = { width?: number; height?: number };

function useSize(arg: Arg): Size {
  if (!arg) {
    throw Error('useSize requires at least 1 argument, but only 0 were passed');
  }

  const [state, setState] = useState<Size>(() => {
    // @ts-ignore
    const targetElement = arg.current ? arg.current : arg;
    return {
      width: (targetElement || {}).clientWidth,
      height: (targetElement || {}).clientHeight,
    };
  });

  useLayoutEffect(() => {
    // @ts-ignore
    const targetElement = arg.current ? arg.current : arg;
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
  }, [arg]);


  return state;
}

export default useSize;
