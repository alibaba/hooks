import throttle from 'lodash/throttle';
import useCreation from '../useCreation';
import { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';
import useLatest from '../useLatest';

type Fn = (...args: any) => any;

function useThrottleFn<T extends Fn>(fn: T, options?: ThrottleOptions) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error('useThrottleFn expected parameter is a function, got ' + typeof fn);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled as unknown as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
