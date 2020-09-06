import { useState, useRef, useCallback } from 'react';

export interface Options {
  updateRate?: number;
}

export interface Actions {
  start: (time: number) => void;
  pause: () => void;
  cont: () => void;
  reset: () => void;
}

const DEFAULT_UPDATE_RATE = 1000;

function useCountdown(options: Options = {}): [number, Actions] {
  const [remaining, setRemaining] = useState<number>(0);
  const target = useRef<number>(1);
  const startTime = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRemaining(0);
    startTime.current = 0;
    target.current = 0;
  }, []);

  const start = useCallback(
    (time: number) => {
      reset();
      setRemaining(time);
      target.current = time;
      startTime.current = Date.now();

      const timer = setInterval(
        () => {
          const remainingTime = target.current - Date.now() + startTime.current;

          if (remainingTime <= 0) {
            clearInterval(timer);
            setRemaining(0);
          } else {
            setRemaining(remainingTime);
          }
        },
        options.updateRate ? options.updateRate : DEFAULT_UPDATE_RATE,
      );

      timerRef.current = timer;
    },
    [reset, options.updateRate],
  );

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const cont = useCallback(() => {
    if (timerRef.current) {
      throw new Error('The timer is currently running');
    }

    target.current = remaining;
    startTime.current = Date.now();

    const timer = setInterval(
      () => {
        const remainingTime = target.current - Date.now() + startTime.current;
        if (remainingTime <= 0) {
          clearInterval(timer);
          setRemaining(0);
        } else {
          setRemaining(remainingTime);
        }
      },
      options.updateRate ? options.updateRate : DEFAULT_UPDATE_RATE,
    );

    timerRef.current = timer;
  }, [remaining, options.updateRate]);

  return [remaining, { start, pause, cont, reset }];
}

export default useCountdown;
