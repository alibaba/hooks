import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import { BasicTarget } from '../utils/dom';

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
      onEnter && onEnter();
      setTrue();
    },
    {
      target,
    },
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave && onLeave();
      setFalse();
    },
    {
      target,
    },
  );

  return state;
};
