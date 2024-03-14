import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils/index';

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

  const memoLeftTime = useMemo<TDate>(() => {
    return isNumber(leftTime) && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  const target = 'leftTime' in options ? memoLeftTime : targetDate;

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
