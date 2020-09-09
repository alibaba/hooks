import { useState, useRef, useCallback, useEffect } from 'react';

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

function useTimer(options: Options = {}): [number, Actions] {
  const { updateRate = DEFAULT_UPDATE_RATE } = options;
  const [current, setCurrent] = useState<number>(0);
  const target = useRef<number | null>(null);
  const lastTime = useRef<number>(0);
  const startTime = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        timerRef.current && clearInterval(timerRef.current);
      }
    };
  }, []);

  const run = useCallback(() => {
    const timer = setInterval(() => {
      const currentTime = lastTime.current + Date.now() - startTime.current;

      if (target.current && currentTime >= target.current) {
        clearInterval(timer);
        setCurrent(target.current);
      } else {
        setCurrent(currentTime);
      }
    }, updateRate);

    timerRef.current = timer;
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrent(0);
    startTime.current = 0;
    target.current = 0;
    lastTime.current = 0;
  }, []);

  const start = useCallback((time: number | null) => {
    if (time != null && time < 0) {
      throw new Error('target time must greater than 0');
    }

    reset();
    target.current = time;
    startTime.current = Date.now();
    run();
  }, []);

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      lastTime.current = lastTime.current + Date.now() - startTime.current;
    }
  }, []);

  const cont = useCallback(() => {
    if (timerRef.current) {
      throw new Error('The timer is currently running');
    }

    startTime.current = Date.now();
    run();
  }, []);

  return [current, { start, pause, cont, reset }];
}

export default useTimer;
