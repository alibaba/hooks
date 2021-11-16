import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useIsomorphicLayoutEffectWithTarget from '../utils/useIsomorphicLayoutEffectWithTarget';

type Size = { width: number; height: number };

function getTargetSize(target: BasicTarget) {
  try {
    const { width, height } = target.getBoundingClientRect();

    return {
      width,
      height,
    };
  } catch (err) {
    err;
    // fallback to clientSize
    const { clientWidth, clientHeight } = target;

    return {
      width: clientWidth,
      height: clientHeight,
    };
  }
}

function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useRafState<Size>();

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setState(getTargetSize(entry.target));
        });
      });

      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    target,
  );

  return state;
}

export default useSize;
