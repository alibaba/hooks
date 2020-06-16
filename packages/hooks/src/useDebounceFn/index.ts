import { useCreation } from '..';
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import { DebounceOptions } from '../useDebounce/debounceOptions';

type Fn = (...args: any) => any;

interface ReturnValue<T extends Fn> {
  run: T;
  cancel: () => void;
}

function useDebounceFn<T extends Fn>(fn: T, options?: DebounceOptions): ReturnValue<T> {
  const fnRef = useRef<Fn>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce(
        (...args: any) => {
          fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  return {
    run: (debounced as any) as T,
    cancel: debounced.cancel,
  };
}

export default useDebounceFn;
