/**
 * A debounced effect which will not trigger for the first time after mounted
 * @param effect
 * @param deps
 * @param options
 */

import { EffectCallback, useRef } from 'react';
import useDebounceEffect from '../useDebounceEffect';
import { DebounceOptions } from '../useDebounce/debounceOptions';

export default function useDebounceUpdateEffect(
  effect: EffectCallback,
  deps?: ReadonlyArray<any>,
  options?: DebounceOptions
) {
  const isMounted = useRef<boolean>(false);

  useDebounceEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps, options);
}
