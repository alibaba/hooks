import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
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

const isValidTime = (value: any): boolean => {
  return typeof value === 'number' && !Number.isNaN(value);
};

const calcLeft = (leftTime: number, target: TDate): number => {
  if (!leftTime && !target) {
    return 0;
  }
  // should work leftTime, and ignored targetDate, if both leftTime and targetDate
  if (isValidTime(leftTime)) {
    return leftTime < 0 ? 0 : leftTime;
  }
  if (target) {
    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    const left = dayjs(target).valueOf() - Date.now();
    return left < 0 ? 0 : left;
  }
  return 0;
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

  const left = useMemo(() => calcLeft(leftTime!, targetDate), [leftTime, targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => left);

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!left) {
      // for stop
      setTimeLeft(0);
      return;
    }

    setTimeLeft(left); // 先执行一次

    const timer = setInterval(() => {
      setTimeLeft((prevState) => {
        const result = prevState - interval;
        if (prevState === 0) {
          onEndRef.current?.();
          clearInterval(timer);
        }
        return result < 0 ? 0 : result;
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
