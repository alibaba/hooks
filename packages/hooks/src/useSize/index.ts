import ResizeObserver from "resize-observer-polyfill";
import useRafState from "../useRafState";
import type { BasicTarget } from "../utils/domTarget";
import { getTargetElement } from "../utils/domTarget";
import useIsomorphicLayoutEffectWithTarget from "../utils/useIsomorphicLayoutEffectWithTarget";
import useDebounceFn from "../useDebounceFn";
import type { DebounceOptions } from "../useDebounce/debounceOptions";
import useMemoizedFn from "../useMemoizedFn";
import useThrottleFn from "../useThrottleFn";
import type { ThrottleOptions } from "../useThrottle/throttleOptions";

type Size = { width: number; height: number };

function useSize(
  target: BasicTarget,
  options?: {
    debounceOptions?: DebounceOptions;
    throttleOptions?: ThrottleOptions;
  }
): Size | undefined {
  const [state, setState] = useRafState<Size | undefined>(() => {
    const el = getTargetElement(target);
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  const debounce = useDebounceFn(setState, options?.debounceOptions);

  const throttle = useThrottleFn(setState, options?.throttleOptions);

  const setStateMemoizedFn = useMemoizedFn((nextState: Size) => {
    if (options?.debounceOptions) {
      debounce.run(nextState);
      return;
    }

    if (options?.throttleOptions) {
      throttle.run(nextState);
      return;
    }

    setState(nextState);
  });

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setStateMemoizedFn({ width: clientWidth, height: clientHeight });
        });
      });
      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    target
  );

  return state;
}

export default useSize;
