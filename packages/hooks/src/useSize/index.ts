import { useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';
import type { BasicTarget } from '../utils/dom2';
import { getTargetElement } from '../utils/dom2';

type Size = { width: number; height: number };

function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useState<Size>();

  useIsomorphicLayoutEffect(() => {
    const el = getTargetElement(target);

    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(el);
    return () => {
      resizeObserver.disconnect();
    };
  }, [typeof target === 'function' ? undefined : target]);

  return state;
}

export default useSize;
