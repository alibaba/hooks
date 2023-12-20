import { useState } from 'react';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/domTarget';

export interface Options {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (isFocusWithin: boolean) => void;
}

/**
 * Monitor whether the current focus is within a certain area, Same as css attribute [:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within).
 * @see https://ahooks.js.org/hooks/use-focus-within
 */
export default function useFocusWithin(target: BasicTarget, options?: Options) {
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const { onFocus, onBlur, onChange } = options || {};

  useEventListener(
    'focusin',
    (e: FocusEvent) => {
      if (!isFocusWithin) {
        onFocus?.(e);
        onChange?.(true);
        setIsFocusWithin(true);
      }
    },
    {
      target,
    },
  );

  useEventListener(
    'focusout',
    (e: FocusEvent) => {
      if (isFocusWithin && !(e.currentTarget as Element)?.contains?.(e.relatedTarget as Element)) {
        onBlur?.(e);
        onChange?.(false);
        setIsFocusWithin(false);
      }
    },
    {
      target,
    },
  );

  return isFocusWithin;
}
