import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
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

const isValidTime = (value: number): boolean => {
  // 只有大于 0 的 number 才是有效的剩余时间
  return typeof value === 'number' && !Number.isNaN(value) && value > 0;
};

const calcLeft = (target?: TDate) => {
  if (!target) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(target).valueOf() - Date.now();
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

const useCountdown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const [timeLeft, setTimeLeft] = useState(() => {
    if ('leftTime' in options) {
      return calcLeft(isValidTime(leftTime!) ? Date.now() + leftTime! : undefined);
    } else {
      return calcLeft(targetDate);
    }
  });

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    let endDate: TDate;
    if ('leftTime' in options) {
      endDate = isValidTime(leftTime!) ? Date.now() + leftTime! : undefined;
    } else {
      endDate = targetDate;
    }

    if (!endDate) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(endDate));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(endDate);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [leftTime, targetDate, interval]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
