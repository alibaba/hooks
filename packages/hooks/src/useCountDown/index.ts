import dayjs from 'dayjs';
import { useEffect, useMemo, useState, useRef } from 'react';
import useLatest from '../useLatest';

export type TDate = dayjs.ConfigType;

export type Options = {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeftTarget = (t?: TDate) => {
  if (!t) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(t).valueOf() - Date.now();
  if (left < 0) {
    return 0;
  }
  return left;
};

const calcLeftTime = (t?: number, interval: number = 0): number => {
  if (!t) {
    return 0;
  }
  const left = t - interval;
  if (left < 0) {
    return 0;
  }
  return left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: (milliseconds / 86400000) >>> 0,
    hours: ((milliseconds / 3600000) >>> 0) % 24,
    minutes: ((milliseconds / 60000) >>> 0) % 60,
    seconds: ((milliseconds / 1000) >>> 0) % 60,
    milliseconds: (milliseconds >>> 0) % 1000,
  };
};

const useCountdown = (options?: Options) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const [timeLeft, setTimeLeft] = useState(() => {
    return leftTime ? calcLeftTime(leftTime) : calcLeftTarget(targetDate);
  });

  const onEndRef = useLatest(onEnd);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!targetDate && !leftTime) {
      // for stop
      setTimeLeft(0);
      return;
    }
    // 有 leftTime 就以 leftTime 为主，没有就以 targetDate 为主
    setTimeLeft(leftTime ? calcLeftTime(leftTime) : calcLeftTarget(targetDate)); // 先执行一次

    timerRef.current = setInterval(() => {
      setTimeLeft((prevState) => {
        if (leftTime) {
          return calcLeftTime(prevState, interval);
        } else {
          return calcLeftTarget(targetDate);
        }
      });
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [leftTime, targetDate, interval]);

  useEffect(() => {
    if (timeLeft === 0) {
      onEndRef.current?.();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [timeLeft]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
