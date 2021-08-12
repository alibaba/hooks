import { useRef } from 'react';
import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/dom2';

type EventType = MouseEvent | TouchEvent;

interface LongPressOptions {
  delay?: number;
  cancelOnMovement?: boolean;
}

function useLongPress(
  onLongPress: (event: EventType) => void,
  target: BasicTarget,
  { delay = 1500, cancelOnMovement = true }: LongPressOptions = {},
) {
  console.log('ff:', cancelOnMovement);
  const onLongPressRef = useLatest(onLongPress);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [state, { setTrue, setFalse }] = useBoolean(false);

  let startTime = 0;

  useEventListener(
    'mousedown',
    (e) => {
      e.preventDefault();

      startTime = Date.now();
      timer.current = setTimeout(() => onLongPressRef.current(e), delay);

      setTrue();
    },
    { target },
  );

  useEventListener(
    'mouseup',
    (e) => {
      e.preventDefault();

      if (e.currentTarget === target) {
        clearTimeout(timer.current!);
      }

      setFalse();
    },
    { target: document },
  );

  useEventListener(
    'mouseout',
    () => {
      if (cancelOnMovement) {
        setFalse();
        clearTimeout(timer.current!);
      }
    },
    { target: document },
  );

  return state;
}

export default useLongPress;
