import type { DependencyList } from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import { formatTime } from './utils';

interface Options {
  onComplete?: () => void;
  auto?: boolean;
  isCountDown?: boolean;
}
type CheckNumber<Time, Type> = Time extends number ? Type : never;

export interface ReturnValue<Time extends Date | number> {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  remainingTime: number;
  start: CheckNumber<Time, () => void>;
  pause: () => CheckNumber<Time, () => void>;
  reset: CheckNumber<Time, (withBegin?: boolean, resetTime?: number) => void>;
  isPaused?: boolean;
  isCounting?: boolean;
}

function useTimer<T extends Date | number>(
  time: Date | number,
  options: Options = {},
  deps: DependencyList = [],
): ReturnValue<T> {
  const [isPaused, setIsPaused] = useState(false);
  const { auto = true, onComplete = () => {} } = options;
  const [isCounting, setisCounting] = useState<boolean>(false);
  const isCountDown = options.isCountDown || typeof time === 'number';
  const timeRef = useRef<number>(
    isCountDown ? (typeof time === 'number' ? Date.now() + time : Number(time)) : Number(time),
  );
  const timeHandle = useRef<number>();
  const [timeProperties, setTimeProperties] = useState(() => formatTime(timeRef.current, true));

  const clearRef = () => {
    timeHandle.current = 0;
    setisCounting(false);
    window.cancelAnimationFrame(timeHandle.current || 0);
  };

  const showTime = () => {
    const formatedTime = formatTime(timeRef.current, !isCountDown);
    setTimeProperties(formatedTime);
    if (formatedTime.remainingTime >= 16 && timeHandle.current) {
      timeHandle.current = window.requestAnimationFrame(() => showTime());
    } else {
      if (timeHandle.current) {
        onComplete();
        clearRef();
      }
    }
  };

  useEffect(() => {
    if (!isCountDown || (auto && isCountDown)) {
      setisCounting(true);
      timeHandle.current = window.requestAnimationFrame(() => showTime());
    }
    return clearRef;
  }, []);

  useUpdateEffect(() => {
    timeRef.current = isCountDown
      ? typeof time === 'number'
        ? Date.now() + time
        : Number(time)
      : Number(time);
    setTimeProperties(() => formatTime(timeRef.current, true));
    if (auto) {
      setisCounting(true);
      if (timeHandle.current) {
        window.cancelAnimationFrame(timeHandle.current);
      }
      timeHandle.current = window.requestAnimationFrame(() => showTime());
    }
  }, [...deps, isCountDown && time]);

  const timeMethods = useMemo(() => {
    const start = () => {
      setisCounting(true);
      setIsPaused(false);
      // 在开始前点击 timeRef.current > 0 并且 timeProperties.remainingTime  === number * 1000
      // 在暂停后点击 timeProperties.remainingTime > 16 并且 timeHandle.current === 0
      if (
        (timeProperties.remainingTime >= 16 && !timeHandle.current) ||
        (timeRef.current && timeProperties.remainingTime === Number(time))
      ) {
        timeRef.current = Date.now() + timeProperties.remainingTime;
        timeHandle.current = window.requestAnimationFrame(() => showTime());
      }
    };

    const pause = () => {
      clearRef();
      setisCounting(false);
      setIsPaused(true);
    };

    const reset = (withBegin: boolean = false, resetTime: number = time as number) => {
      clearRef();
      const tempTimeProperties = formatTime(Date.now() + Number(resetTime));
      setIsPaused(!withBegin);
      setisCounting(withBegin);
      setTimeProperties(tempTimeProperties);
      if (withBegin) {
        timeRef.current = Date.now() + tempTimeProperties.remainingTime;
        timeHandle.current = window.requestAnimationFrame(() => showTime());
      }
    };

    return {
      start,
      pause,
      reset,
    };
  }, [timeProperties, isCounting, isPaused]);

  if (isCountDown) {
    // @ts-ignore
    return {
      ...timeProperties,
      ...timeMethods,
      isCounting,
      isPaused,
      isPausing: isPaused,
    } as ReturnValue<number>;
  }
  // @ts-ignore
  return {
    ...timeProperties,
  } as ReturnValue<Date>;
}

export default useTimer;
