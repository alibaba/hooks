import { useRef } from 'react';
import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/dom2';

type EventType = MouseEvent | TouchEvent;

function useLongPress(onLongPress: (event: EventType) => void, target: BasicTarget, delay: number) {
  const onLongPressRef = useLatest(onLongPress);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [state, { setTrue, setFalse }] = useBoolean(false);

  let startTime = 0;
  let endTime = 0;

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

      endTime = Date.now();
      if (endTime - startTime < delay) {
        clearTimeout(timer.current!);
      }

      setFalse();
    },
    { target },
  );

  return state;
}

export default useLongPress;
