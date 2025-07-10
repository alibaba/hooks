import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/domTarget';
import { useRef } from 'react';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
  onLongHover?: (isLongHovering: boolean) => void;
  longHoverDuration?: number;
}

export default (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave, onChange, onLongHover, longHoverDuration = 500 } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  const timerRef = useRef<number | null>(null);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
      onChange?.(true);
      if (onLongHover) {
        timerRef.current = window.setTimeout(() => {
          onLongHover?.(true);
        }, longHoverDuration);
      }
    },
    {
      target,
    },
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
      onChange?.(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        onLongHover?.(false);
      }
    },
    {
      target,
    },
  );

  return state;
};
