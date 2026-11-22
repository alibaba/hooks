import { useRef, useState } from 'react';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/domTarget';

export interface Options {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (isFocusWithin: boolean) => void;
}

export default function useFocusWithin(target: BasicTarget, options?: Options) {
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const focusedRef = useRef(false);
  const { onFocus, onBlur, onChange } = options || {};

  useEventListener(
    'focusin',
    (e: FocusEvent) => {
      if (!focusedRef.current) {
        focusedRef.current = true;
        setIsFocusWithin(true);
        onFocus?.(e);
        onChange?.(true);
      }
    },
    {
      target,
    },
  );

  useEventListener(
    'focusout',
    (e: FocusEvent) => {
      if (
        focusedRef.current &&
        !(e.currentTarget as Element)?.contains?.(e.relatedTarget as Element)
      ) {
        focusedRef.current = false;
        setIsFocusWithin(false);
        onBlur?.(e);
        onChange?.(false);
      }
    },
    {
      target,
    },
  );

  return isFocusWithin;
}
