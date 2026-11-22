import { useRef, useState } from 'react';
import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';
import isBrowser from '../utils/isBrowser';

/** Idle threshold used when the caller passes no timeout. */
export const DEFAULT_IDLE_TIMEOUT = 60_000;

/** Activity events that reset the idle timer. */
export const DEFAULT_IDLE_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'wheel',
  'touchstart',
  'scroll',
] as const;

export interface Options {
  /** Activity events that count as "not idle". */
  events?: readonly string[];
  /**
   * Where activity is observed.
   * @default document
   */
  target?: BasicTarget<Document | Element | Window>;
  /** Idle state before the first timeout elapses. */
  initialState?: boolean;
  /** Called when the idle state changes. */
  onChange?: (idle: boolean) => void;
}

/**
 * Report whether the user has been idle for `timeout` milliseconds.
 *
 * Activity on the target (mouse, keyboard, wheel, touch, scroll) resets the
 * timer. A non-positive timeout disables detection and returns `initialState`.
 * On the server the hook returns `initialState` and touches no DOM.
 */
const useIdle = (timeout: number = DEFAULT_IDLE_TIMEOUT, options: Options = {}): boolean => {
  const { events = DEFAULT_IDLE_EVENTS, target, initialState = false, onChange } = options;

  const [idle, setIdle] = useState(initialState);
  const idleRef = useRef(initialState);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onChangeRef = useLatest(onChange);
  const eventsKey = events.join(',');

  useEffectWithTarget(
    () => {
      if (!isBrowser || !(timeout > 0)) {
        return;
      }
      const element = target ? getTargetElement(target) : document;
      if (!element?.addEventListener) {
        return;
      }

      const update = (next: boolean) => {
        if (idleRef.current === next) {
          return;
        }
        idleRef.current = next;
        setIdle(next);
        onChangeRef.current?.(next);
      };

      const restart = () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => update(true), timeout);
      };

      const onActivity = () => {
        update(false);
        restart();
      };

      for (const event of events) {
        element.addEventListener(event, onActivity, { passive: true });
      }
      restart();

      return () => {
        for (const event of events) {
          element.removeEventListener(event, onActivity);
        }
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }
      };
    },
    [timeout, eventsKey, target],
    target,
  );

  return idle;
};

export default useIdle;
