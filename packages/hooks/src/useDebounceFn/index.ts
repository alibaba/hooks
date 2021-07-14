import debounce from 'lodash/debounce';
import useCreation from '../useCreation';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';
import { devCheckDecorator } from '../utils/check';

type Fn = (...args: any) => any;

function useDebounceFn<T extends Fn>(fn: T, options?: DebounceOptions) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default devCheckDecorator(useDebounceFn);
