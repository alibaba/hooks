import dayjs from 'dayjs';
import { useEffect, useMemo, useState, useRef } from 'react';
import useLatest from '../useLatest';

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const isValidTime = (value: any): boolean => {
  return typeof value === 'number' && !Number.isNaN(value);
};

const calcLeft = (startTime: number, leftTime: number, target: TDate): number => {
  if (!leftTime && !target) {
    return 0;
  }

  let targetTime = 0;
  // should work leftTime, and ignored targetDate, if both leftTime and targetDate
  if (isValidTime(leftTime)) {
    targetTime = startTime + leftTime;
  } else if (target) {
    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    targetTime = dayjs(target).valueOf();
  }
  const left = targetTime - Date.now();
  return left < 0 ? 0 : left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountdown = (options?: Options) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const startTime = useRef<number>(Date.now());

  const onEndRef = useLatest(onEnd);

  const [timeLeft, setTimeLeft] = useState(() =>
    calcLeft(startTime.current, leftTime!, targetDate),
  );

  useEffect(() => {
    if (!leftTime && !targetDate) {
      // for stop
      setTimeLeft(0);
      return;
    }

    setTimeLeft(calcLeft(startTime.current, leftTime!, targetDate)); // 先执行一次

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          onEndRef.current?.();
          clearInterval(timer);
        }
        return calcLeft(startTime.current, leftTime!, targetDate);
      });
    }, interval);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [leftTime, targetDate, interval]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
