import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils/index';

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number; // 保留interval选项，以便在需要时使用setInterval
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (target?: TDate): number => {
  if (!target) {
    return 0;
  }
  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
};

const parseMs = (milliseconds: number): FormattedRes => ({
  days: Math.floor(milliseconds / 86400000),
  hours: Math.floor(milliseconds / 3600000) % 24,
  minutes: Math.floor(milliseconds / 60000) % 60,
  seconds: Math.floor(milliseconds / 1000) % 60,
  milliseconds: Math.floor(milliseconds) % 1000,
});

const useCountdown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options;

  const memoLeftTime = useMemo<TDate>(() => {
    if (isNumber(leftTime) && leftTime > 0) {
      return Date.now() + leftTime;
    }
    return undefined;
  }, [leftTime]);

  const target = 'leftTime' in options ? memoLeftTime : targetDate;
  const [timeLeft, setTimeLeft] = useState<number>(() => calcLeft(target));
  const onEndRef = useLatest(onEnd);
  const requestRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const update = () => {
    const targetLeft = calcLeft(target);
    setTimeLeft(targetLeft);

    if (targetLeft === 0) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      onEndRef.current?.();
    } else {
      requestRef.current = requestAnimationFrame(update);
    }
  };

  useEffect(() => {
    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(calcLeft(target));

    if ('requestAnimationFrame' in window && typeof requestAnimationFrame !== 'undefined') {
      requestRef.current = requestAnimationFrame(update);
    } else {
      intervalRef.current = window.setInterval(() => {
        const targetLeft = calcLeft(target);
        setTimeLeft(targetLeft);
        if (targetLeft === 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          onEndRef.current?.();
        }
      }, interval);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [target, interval, onEndRef]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
