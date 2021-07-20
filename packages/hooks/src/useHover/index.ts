import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import type { BasicTarget } from '../utils/dom2';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
}

export default (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
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
    },
    {
      target,
    },
  );

  return state;
};
